import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

app.use('/api', authRouter);

app.listen(PORT, () =>
  console.log(`API rodando em http://localhost:${PORT}`)
);
