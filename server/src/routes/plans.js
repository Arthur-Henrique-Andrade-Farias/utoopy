// server/src/routes/plans.js
import { Router }      from 'express'
import { verifyToken } from '../utils/jwt.js'
import { supabase }    from '../../databases/supabaseClient.js'

const router = Router()

/* 
  GET /plans
  → devolve:
    {
      level: "starter" | "bronze" | "silver" | "gold",
      plans: [
        { id:"bronze", name:"Bronze", price:49.9, selected:false },
        ...
      ]
    }
*/
router.get('/plans', verifyToken, async (req, res) => {
  const userId = req.user.id

  try {
    /* 1) Busca nível do usuário ------------------------------------------- */
    const { data: user, error: usrErr } = await supabase
      .from('users')
      .select('level')
      .eq('id', userId)
      .single()

    if (usrErr) {
      if (usrErr.code === 'PGRST116')           // nenhum usuário
        return res.status(404).json({ msg: 'Usuário não encontrado' })
      throw usrErr
    }

    const level = user.level || 'starter'

    /* 2) Monta lista de planos com flag selected -------------------------- */
    const plans = [
      { id: 'bronze', name: 'Bronze', price: 49.9 },
      { id: 'silver', name: 'Silver +', price: 79.9 },
      { id: 'gold',   name: 'Gold ++',  price: 99.9 },
    ].map(p => ({ ...p, selected: p.id === level }))

    res.json({ level, plans })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ msg: 'Erro ao buscar planos', error: err.message })
  }
})

export default router
