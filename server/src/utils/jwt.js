// src/utils/jwt.js
import * as dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('JWT_SECRET não definido – crie ou edite o arquivo .env');
}

export const signToken  = (payload) => jwt.sign(payload, secret, { expiresIn: '7d' });
export const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ msg: 'Token ausente' });

  try {
    req.user = jwt.verify(auth.slice(7), secret);
    next();
  } catch {
    res.status(401).json({ msg: 'Token inválido ou expirado' });
  }
};
