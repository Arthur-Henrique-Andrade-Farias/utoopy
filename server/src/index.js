// index.js (Seu arquivo principal do servidor)

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; // dotenv para carregar .env

// Seus roteadores existentes
import authRouter from './routes/auth.js';
import homeRouter from './routes/home.js';

// Importe o NOVO roteador para recuperação de senha
import passwordRecoveryRouter from './routes/recoveryPass.js';

dotenv.config(); // Carrega variáveis de ambiente do .env

const app = express();
const PORT = process.env.PORT || 3000; // Render define PORT automaticamente, 3000 é um fallback

// --- INÍCIO DA CONFIGURAÇÃO DE CORS ---

// Lista de origens permitidas
const allowedOrigins = [
    // Adicione a URL do seu frontend implantado a partir de uma variável de ambiente.
    // No Render, vá nas configurações do seu serviço de backend e defina uma variável de ambiente:
    // NOME: FRONTEND_URL
    // VALOR: https://seu-frontend-implantado.onrender.com (use HTTPS!)
    process.env.FRONTEND_URL,

    // Adicione as URLs do seu frontend de desenvolvimento local
    'http://localhost:8080' // A origem que estava causando o erro nos seus logs
    // Se você usa outras portas para o frontend local (ex: Vite usa 5173 por padrão), adicione-as também:
    // 'http://localhost:5173',
].filter(Boolean); // .filter(Boolean) remove quaisquer valores undefined/null se FRONTEND_URL não estiver definida

const corsOptions = {
  origin: function (origin, callback) {
    // Permite requisições sem 'origin' (ex: apps mobile, Postman, curl)
    // OU se a 'origin' está na lista de allowedOrigins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Log para o servidor para depuração
      console.error(`Tentativa de acesso CORS bloqueada para origem: ${origin}. Origens permitidas: ${allowedOrigins.join(', ')}`);
      callback(new Error(`A política de CORS para este site não permite acesso da origem especificada: ${origin}.`));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // Garante que OPTIONS é tratado
  credentials: true, // Importante se você envia cookies ou cabeçalhos de autorização
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Cabeçalhos comuns
  optionsSuccessStatus: 204 // Responde às requisições preflight (OPTIONS) com 204 No Content
};

// Aplica o middleware CORS com as opções configuradas
app.use(cors(corsOptions));

// Middleware opcional para logar detalhes da requisição para depuração de CORS
app.use((req, res, next) => {
  console.log(`Requisição recebida: ${req.method} ${req.path} - Origem: ${req.headers.origin}`);
  next();
});

// --- FIM DA CONFIGURAÇÃO DE CORS ---

// Middlewares Globais
app.use(express.json()); // Middleware para parsear corpos de requisição JSON

// Montar seus roteadores
app.use('/api', authRouter); // Para /api/login, /api/register
app.use('/api', homeRouter); // Para /api/home (e outras rotas dentro de homeRouter)
app.use('/api', passwordRecoveryRouter); // Monta o roteador de recuperação de senha

// Iniciar o Servidor
app.listen(PORT, () => {
  const appName = process.env.npm_package_name || 'utoopy-api'; // Pega o nome do package.json ou usa um padrão
  console.log(`API '${appName}' rodando na porta ${PORT}.`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`); // Mostra o ambiente atual
  if (allowedOrigins.length > 0) {
    console.log(`CORS configurado para permitir as seguintes origens: ${allowedOrigins.join(', ')}`);
  } else {
    console.warn("AVISO DE CORS: Nenhuma origem explicitamente permitida foi configurada. Isso pode ser intencional ou um erro de configuração.");
  }
  if (!process.env.FRONTEND_URL && (process.env.NODE_ENV === 'production' || !process.env.NODE_ENV)) {
    console.warn("AVISO: Variável de ambiente FRONTEND_URL não está definida. O frontend implantado pode não conseguir se conectar via CORS.");
  }
});