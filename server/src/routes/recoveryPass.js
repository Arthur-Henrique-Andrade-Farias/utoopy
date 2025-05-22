// routes/passwordRecoveryRoutes.js

import { Router } from 'express';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import bcrypt from 'bcryptjs';

// Importe o cliente Supabase (ajuste o caminho se necessário, relativo a ESTE arquivo)
// Exemplo: se passwordRecoveryRoutes.js está em 'routes/' e supabaseClient.js em 'databases/'
import { supabase } from '../../databases/supabaseClient.js';

const router = Router();

// Configuração do OAuth2 para Gmail e createTransporter (específico para este roteador)
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN
});

async function createTransporter() {
    try {
        const accessToken = await oauth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.GMAIL_USER,
                clientId: process.env.GMAIL_CLIENT_ID,
                clientSecret: process.env.GMAIL_CLIENT_SECRET,
                refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });
        return transporter;
    } catch (error) {
        console.error("Error creating transporter or getting access token:", error);
        throw new Error('Failed to create email transporter');
    }
}

// ROTA PARA SOLICITAR RECUPERAÇÃO DE SENHA
// Como este router será montado em '/api', a rota aqui será relativa a isso.
// Ex: router.post('/forgot-password', ...) será acessível como POST /api/forgot-password
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    console.log(`[${new Date().toISOString()}] POST /api/forgot-password (via router) - Recebido email:`, email);

    if (!email) {
        return res.status(400).json({ message: 'Email é obrigatório.' });
    }
    try {
        const { data: users, error: userError } = await supabase
            .from('users')
            .select('id, email')
            .eq('email', email)
            .single();
        if (userError && userError.code !== 'PGRST116') {
            console.error('Supabase error fetching user:', userError);
            return res.status(500).json({ message: 'Erro ao buscar usuário.' });
        }
        if (!users) {
            console.log(`Tentativa de recuperação para email não registrado: ${email}`);
            return res.status(200).json({ message: 'Se um usuário com este email existir, um código de recuperação será enviado.' });
        }
        const recoveryCode = crypto.randomInt(100000, 999999).toString();
        const expirationTime = new Date(Date.now() + 60 * 60 * 1000);
        await supabase.from('password_reset_tokens').delete().eq('user_email', users.email);
        const { error: insertError } = await supabase
            .from('password_reset_tokens')
            .insert({ user_email: users.email, token: recoveryCode, expires_at: expirationTime.toISOString() });
        if (insertError) {
            console.error('Supabase error inserting token:', insertError);
            return res.status(500).json({ message: 'Erro ao salvar token de recuperação.' });
        }
        let emailTransporter = await createTransporter();
        const mailOptions = {
            from: `"Seu App" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: 'Código de Recuperação de Senha - Seu App',
            text: `Olá,\n\nSeu código de recuperação é: ${recoveryCode}\n\nEste código expira em 1 hora.`,
            html: `<p>Olá,</p><p>Seu código de recuperação é: <strong>${recoveryCode}</strong></p><p>Este código expira em 1 hora.</p>`,
        };
        await emailTransporter.sendMail(mailOptions);
        console.log(`Código de recuperação enviado para ${email}: ${recoveryCode}`);
        res.status(200).json({ message: 'Código de recuperação enviado para o seu email.' });
    } catch (error) {
        console.error('Erro no processo de forgot-password:', error);
        if (error.message?.includes('Failed to create email transporter')) {
             return res.status(500).json({ message: 'Erro ao configurar o serviço de email.' });
        }
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

// ROTA PARA VERIFICAR O CÓDIGO DE RECUPERAÇÃO
router.post('/verify-recovery-code', async (req, res) => {
    const { email, token } = req.body;
    console.log(`[${new Date().toISOString()}] POST /api/verify-recovery-code (via router) - Email: ${email}, Token: ${token}`);
    if (!email || !token) {
        return res.status(400).json({ message: 'Email e código são obrigatórios.' });
    }
    try {
        const { data: tokenData, error: tokenError } = await supabase
            .from('password_reset_tokens')
            .select('user_email, expires_at')
            .eq('user_email', email)
            .eq('token', token)
            .single();
        if (tokenError || !tokenData) {
            return res.status(400).json({ message: 'Código inválido ou expirado.' });
        }
        if (new Date() > new Date(tokenData.expires_at)) {
            await supabase.from('password_reset_tokens').delete().eq('token', token);
            return res.status(400).json({ message: 'Código expirado.' });
        }
        res.status(200).json({ message: 'Código verificado com sucesso!' });
    } catch (error) {
        console.error('Erro ao verificar código:', error);
        res.status(500).json({ message: 'Erro interno ao verificar o código.' });
    }
});

// ROTA PARA REDEFINIR A SENHA
router.post('/reset-password', async (req, res) => {
    const { email, token, newPassword } = req.body;
    console.log(`[${new Date().toISOString()}] POST /api/reset-password (via router) - Email: ${email}`);
    if (!email || !token || !newPassword) {
        return res.status(400).json({ message: 'Email, código e nova senha são obrigatórios.' });
    }
    if (newPassword.length < 6) {
        return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
    }
    try {
        const { data: tokenData, error: tokenError } = await supabase
            .from('password_reset_tokens')
            .select('user_email, expires_at')
            .eq('user_email', email)
            .eq('token', token)
            .single();
        if (tokenError || !tokenData) {
            return res.status(400).json({ message: 'Token inválido ou não encontrado.' });
        }
        if (new Date() > new Date(tokenData.expires_at)) {
            await supabase.from('password_reset_tokens').delete().eq('token', token);
            return res.status(400).json({ message: 'Token expirado.' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const { error: updateError } = await supabase
            .from('users')
            .update({ password: hashedPassword, updated_at: new Date().toISOString() })
            .eq('email', email);
        if (updateError) {
            console.error('Erro ao atualizar senha:', updateError);
            return res.status(500).json({ message: "Erro ao atualizar senha."});
        }
        await supabase.from('password_reset_tokens').delete().eq('token', token);
        res.status(200).json({ message: 'Senha redefinida com sucesso!' });
    } catch (error) {
        console.error('Erro ao redefinir senha:', error);
        res.status(500).json({ message: 'Erro interno ao redefinir a senha.' });
    }
});

export default router;