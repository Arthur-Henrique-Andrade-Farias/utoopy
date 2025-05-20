// server/src/routes/home.js
import { Router }      from 'express';
import { verifyToken } from '../utils/jwt.js';
import { pool }        from '../config/db.js';

const router = Router();

router.get('/home', verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    /* 1) user + level */
    const [[user]] = await pool.query(
      'SELECT id, name, email, level FROM users WHERE id = ?',
      [userId]
    );
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

    /* 2) Coleta condicional */
    let posts = [], comments = [], analytics = {};
    switch (user.level) {
      case 'bronze':
      case 'silver':
      case 'ouro':
        [posts] = await pool.query(
          `SELECT id, theme,
                  DATE_FORMAT(scheduled_at,'%d/%m/%Y') AS day,
                  DATE_FORMAT(scheduled_at,'%H:%i')     AS hour
             FROM posts
            WHERE user_id = ?
            ORDER BY scheduled_at DESC
            LIMIT 10`,
          [userId]
        );
        if (user.level === 'silver' || user.level === 'ouro') {
          const [raw] = await pool.query(
            `SELECT c.id, c.post_id, c.parent_id,
                    c.author_name, c.text,
                    DATE_FORMAT(c.created_at,'%d/%m/%Y %H:%i') AS created_at
               FROM comments c
               JOIN posts p ON p.id = c.post_id
              WHERE p.user_id = ?
              ORDER BY c.created_at DESC
              LIMIT 50`,
            [userId]
          );
          const map = {}; raw.forEach(c => (map[c.id] = { ...c, replies: [] }));
          raw.forEach(c =>
            c.parent_id ? map[c.parent_id]?.replies.push(map[c.id]) : comments.push(map[c.id])
          );
        }
        if (user.level === 'ouro') {
          [[analytics]] = await pool.query(
            `SELECT posts_count, likes_count, followers_count
               FROM analytics
              WHERE user_id = ?
              ORDER BY updated_at DESC
              LIMIT 1`,
            [userId]
          );
        }
        break;
      default:
        // starter não recebe nada
    }

    res.json({ user, posts, comments, analytics });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao buscar informações', error: err.message });
  }
});

export default router;
