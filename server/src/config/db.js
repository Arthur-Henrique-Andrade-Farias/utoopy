// server/src/config/db.js   (exemplo)
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();


export const pool = mysql.createPool({
  host:     process.env.DB_HOST || 'localhost',
  user:     process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '220703',
  database: process.env.DB_NAME || 'auth_utoopy',   
  waitForConnections: true,
  connectionLimit: 10
});

