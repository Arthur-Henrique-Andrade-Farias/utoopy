import * as dotenv from 'dotenv';
dotenv.config();

import { Router } from 'express';
import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';
import { signToken } from '../utils/jwt.js';

const router = Router();

/* -------- /register -------- */
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ msg: 'Nome, e-mail e senha são obrigatórios' });

  try {
    // 1. E-mail duplicado?
    const [rows] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length) return res.status(409).json({ msg: 'E-mail já cadastrado' });

    // 2. Hash da senha
    const hash = await bcrypt.hash(password, 12);

    // 3. Inserir no banco
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hash]
    );

    // 4. Gerar token
    const token = signToken({ id: result.insertId, name, email });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro interno' });
  }
});

/* -------- /login -------- */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: 'E-mail e senha são obrigatórios' });

  try {
    // 1. Usuário existe?
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ msg: 'Credenciais inválidas' });

    const user = rows[0];

    // 2. Senha confere?
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ msg: 'Credenciais inválidas' });

    // 3. Token
    const token = signToken({ id: user.id, name: user.name, email: user.email });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro interno' });
  }
});

export default router;
