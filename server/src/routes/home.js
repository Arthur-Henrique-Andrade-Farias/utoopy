import { Router }      from 'express';
import { verifyToken } from '../utils/jwt.js';
import { supabase }    from '../../databases/supabaseClient.js'; // << mudou!

const router = Router();

/* Helpers para formatação de data/hora */
const fmtDate = ts =>
  new Date(ts).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
const fmtTime = ts =>
  new Date(ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });

router.get('/home', verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    /* 1) Usuário + level */
    const { data: user, error: usrErr } = await supabase
      .from('users')
      .select('id, name, email, level')
      .eq('id', userId)
      .single();

    if (usrErr) {
      if (usrErr.code === 'PGRST116')
        return res.status(404).json({ msg: 'Usuário não encontrado' });
      throw usrErr;
    }

    /* 2) Dados condicionais conforme nível */
    let posts     = [];
    let comments  = [];
    let analytics = {};

    if (['bronze', 'silver', 'ouro'].includes(user.level)) {
      /* Posts */
      const { data: postRows, error: postErr } = await supabase
        .from('posts')
        .select('id, theme, scheduled_at')
        .eq('user_id', userId)
        .order('scheduled_at', { ascending: false })
        .limit(10);

      if (postErr) throw postErr;

      posts = postRows.map(p => ({
        id: p.id,
        theme: p.theme,
        day: fmtDate(p.scheduled_at),
        hour: fmtTime(p.scheduled_at)
      }));

      /* Silver / Ouro: comentários */
      if (['silver', 'ouro'].includes(user.level) && postRows.length) {
        const postIds = postRows.map(p => p.id);

        const { data: rawComments, error: comErr } = await supabase
          .from('comments')
          .select('id, post_id, parent_id, author_name, text, created_at')
          .in('post_id', postIds)
          .order('created_at', { ascending: false })
          .limit(50);

        if (comErr) throw comErr;

        /* Montar árvore */
        const map = {};
        rawComments.forEach(c => (map[c.id] = {
          ...c,
          created_at: `${fmtDate(c.created_at)} ${fmtTime(c.created_at)}`,
          replies: []
        }));
        rawComments.forEach(c =>
          c.parent_id
            ? map[c.parent_id]?.replies.push(map[c.id])
            : comments.push(map[c.id])
        );
      }

      /* Ouro: analytics */
      if (user.level === 'ouro') {
        const { data: analRow, error: anErr } = await supabase
          .from('analytics')
          .select('posts_count, likes_count, followers_count')
          .eq('user_id', userId)
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (anErr) throw anErr;
        analytics = analRow || {};
      }
    }

    res.json({ user, posts, comments, analytics });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao buscar informações', error: err.message });
  }
});

export default router;
