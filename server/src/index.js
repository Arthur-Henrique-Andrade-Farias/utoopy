// index.js (Seu arquivo principal do servidor)

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; // dotenv para carregar .env

// Seus roteadores existentes
import authRouter from './routes/auth.js';
import homeRouter from './routes/home.js';

// Importe o NOVO roteador para recuperação de senha
import passwordRecoveryRouter from './routes/recoveryPass.js'; // << AJUSTE O CAMINHO SE NECESSÁRIO

dotenv.config(); // Carrega variáveis de ambiente do .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares Globais
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

// Montar seus roteadores
app.use('/api', authRouter); // Para /api/login, /api/register
app.use('/api', homeRouter); // Para /api/home (e outras rotas dentro de homeRouter)
app.use('/api', passwordRecoveryRouter); // << MONTA O NOVO ROTEADOR AQUI

// Remova a linha incompleta/errada se ainda estiver lá:
// app.use('/ap') // <<<<<<< REMOVER OU CORRIGIR

// Iniciar o Servidor
app.listen(PORT, () =>
  console.log(`API rodando em http://localhost:${PORT}. Rotas: /api/login, /api/home, /api/forgot-password, etc.`)
);