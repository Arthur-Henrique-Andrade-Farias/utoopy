import * as dotenv from 'dotenv';
dotenv.config();

import { Router } from 'express';
import bcrypt       from 'bcryptjs';
import { signToken } from '../utils/jwt.js';
import { supabase }  from '../../databases/supabaseClient.js';   // << mudou!

const router = Router();

/* -------- /register -------- */
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ msg: 'Nome, e-mail e senha são obrigatórios' });

  try {
    /* 1) E-mail duplicado? */
    const { data: existingUser, error: dupErr } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();                              // retorna null se não achar

    if (dupErr) throw dupErr;
    if (existingUser) return res.status(409).json({ msg: 'E-mail já cadastrado' });

    /* 2) Hash da senha */
    const hash = await bcrypt.hash(password, 12);

    /* 3) Inserir usuário */
    const { data: inserted, error: insErr } = await supabase
      .from('users')
      .insert({ name, email, password: hash })
      .select('id')                                // devolve o id recém-gerado
      .single();

    if (insErr) throw insErr;

    /* 4) Token */
    const token = signToken({ id: inserted.id, name, email });
    res.status(201).json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro interno', error: err.message });
  }
});

/* -------- /login -------- */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: 'E-mail e senha são obrigatórios' });

  try {
    /* 1) Usuário existe? */
    const { data: user, error: usrErr } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();                                   // erro se não achar

    if (usrErr) {
      if (usrErr.code === 'PGRST116')              // “No rows”
        return res.status(401).json({ msg: 'Credenciais inválidas' });
      throw usrErr;
    }

    /* 2) Senha confere? */
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ msg: 'Credenciais inválidas' });

    /* 3) Token */
    const token = signToken({ id: user.id, name: user.name, email: user.email });
    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro interno', error: err.message });
  }
});

export default router;
