<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

/* estado */
const level        = ref('starter');
const posts        = ref([]);
const comments     = ref([]);
const analytics    = ref({});
const postsMocked  = ref(false);
const commMocked   = ref(false);
const analMocked   = ref(false);

/* ========= 1. BUSCA ========== */
onMounted(async () => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios.get('https://utoopy-backend.onrender.com/api/home', {
      headers: { Authorization: `Bearer ${token}` }
    });

    level.value     = data.user.level;
    posts.value     = data.posts;
    comments.value  = data.comments;
    analytics.value = data.analytics;

    /** se não houver dados reais, injeta mock + flag **/
    if (canShowPosts.value && posts.value.length === 0) {
      posts.value = [
        { id: 1, day: '21/05/2025', hour: '09:00', theme: 'Lançamento do Produto X' },
        { id: 2, day: '22/05/2025', hour: '14:30', theme: 'Dica de Marketing Digital' },
        { id: 3, day: '23/05/2025', hour: '10:15', theme: 'Depoimento de Cliente' }
      ];
      postsMocked.value = true;
    }
    if (canShowComments.value && comments.value.length === 0) {
      comments.value = [
        {
          id: 1, author_name: 'Maria', text: 'Adorei o conteúdo!', created_at: '21/05/2025 10:05',
          replies: [{ id: 2, author_name: 'Equipe', text: 'Obrigado pelo feedback! 😊', created_at: '21/05/2025 10:20', replies: [] }]
        }
      ];
      commMocked.value = true;
    }
    if (canShowAnalytics.value && Object.keys(analytics.value).length === 0) {
      analytics.value = { posts_count: 120, likes_count: 3400, followers_count: 980 };
      analMocked.value = true;
    }

  } catch (e) {
    console.error(e);
    router.push('/');
  }
});

/* ========= 2. PERMISSÕES ========== */
const canShowPosts     = computed(() => ['bronze','silver','gold'].includes(level.value));
const canShowComments  = computed(() => ['silver','gold'].includes(level.value));
const canShowAnalytics = computed(() => level.value === 'gold');
</script>

<template>
  <div class="dashboard-modal">
    <h2>GoToMarket – Dashboard</h2>

    <img src="@/assets/home/market.svg"  class="market-icon"      @click="$router.push('/plans')" />
    <img src="@/assets/home/arrow_back.svg" class="back-arrow-icon" @click="$router.push('/')" />

    <div class="cards">
      <!-- ----- POSTAGENS ----- -->
      <div v-if="canShowPosts" class="card postagens">
        <h3>Postagens</h3>
        <table>
          <thead><tr><th>Dia</th><th>Hora</th><th>Tema</th></tr></thead>
          <tbody>
            <tr v-for="p in posts" :key="p.id">
              <td>{{ p.day }}</td><td>{{ p.hour }}</td><td>{{ p.theme }}</td>
            </tr>
          </tbody>
        </table>
        <small v-if="postsMocked" class="upgrade-msg">
          *Exemplo de dados. Agende posts reais para vê-los aqui.
        </small>
      </div>
      <div v-else class="card locked">
        <h3>Postagens</h3>
        <p class="upgrade-msg">Disponível a partir do <strong>Plano Bronze</strong>.</p>
      </div>

      <!-- ----- COMENTÁRIOS ----- -->
      <div v-if="canShowComments" class="card comentarios">
        <h3>Comentários</h3>
        <ul>
          <CommentItem v-for="c in comments" :key="c.id" :comment="c" />
        </ul>
        <small v-if="commMocked" class="upgrade-msg">
          *Exemplo de dados. Migre integrações para ver comentários reais.
        </small>
      </div>
      <div v-else class="card locked">
        <h3>Comentários</h3>
        <p class="upgrade-msg">Disponível a partir do <strong>Plano Silver</strong>.</p>
      </div>

      <!-- ----- ANALYTICS ----- -->
      <div v-if="canShowAnalytics" class="card analytics">
        <h3>Analytics</h3>
        <div class="metrics">
          <div class="metric">
            <span class="value">{{ analytics.posts_count }}</span>
            <span class="label">Posts</span>
          </div>
          <div class="metric">
            <span class="value">{{ analytics.likes_count }}</span>
            <span class="label">Likes</span>
          </div>
          <div class="metric">
            <span class="value">{{ analytics.followers_count }}</span>
            <span class="label">Seguidores</span>
          </div>
        </div>
        <small v-if="analMocked" class="upgrade-msg">
          *Exemplo de métricas. Conecte suas redes para ver dados reais.
        </small>
      </div>
      <div v-else class="card locked">
        <h3>Analytics</h3>
        <p class="upgrade-msg">Disponível no <strong>Plano Gold</strong>.</p>
      </div>
    </div>
  </div>
</template>

<!-- componente recursivo p/ replies -->
<script>
export default {
  name: 'CommentItem',
  props: { comment: Object },
  template: `
    <li>
      <div class="avatar"></div>
      <div class="coment-text">
        <strong>{{ comment.author_name || 'Usuário' }}</strong>
        <p>{{ comment.text }}</p>
        <small>{{ comment.created_at }}</small>
      </div>
      <ul v-if="comment.replies.length" class="replies">
        <CommentItem v-for="r in comment.replies" :key="r.id" :comment="r" />
      </ul>
    </li>
  `
};
</script>

  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  
  .dashboard-modal {
    position: relative;
    font-family: 'Roboto', sans-serif;
    background-color: #f2f2f2;
    border: 2px solid #ccc;
    border-radius: 30px;
    padding: 20px;
    width: 50%;
    height: 80%;
    display: flex;
    flex-direction: column;
  }

  .market-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
  
  .back-arrow-icon {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
  
  .dashboard-modal h2 {
    text-align: center;
    color: #333;
    font-size: 32px;
    margin-bottom: 20px;
  }
  
  .cards {
    flex: 1;
    display: grid;
    grid-template-areas:
      "postagens comentarios"
      "analytics  comentarios";
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px;
  }
  
  .card {
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }
  
  .postagens  { grid-area: postagens; }
  .comentarios{ grid-area: comentarios; }
  .analytics  { grid-area: analytics; }
  
  .card h3 {
    margin: 0 0 15px;
    font-size: 20px;
    color: #333;
  }
  
  /* Tabela “Postagens” */
  .postagens table {
    width: 100%;
    border-collapse: collapse;
  }
  .postagens th,
  .postagens td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #e0e0e0;
    color: #555;
  }
  .postagens th {
    color: #333;
    font-weight: bold;
  }
  
  /* Lista “Comentários” */
  .comentarios ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .comentarios li {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .avatar {
    width: 32px;
    height: 32px;
    background: #ddd;
    border-radius: 50%;
    margin-right: 10px;
  }
  .coment-text {
    flex: 1;
  }
  .line {
    height: 8px;
    background: #ddd;
    border-radius: 4px;
    margin-bottom: 6px;
  }
  .line-short { width: 40%; }
  .line-long  { width: 80%; }
  
  /* Card “Analytics” */
  .analytics .metrics {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  .metric {
    text-align: center;
  }
  .value {
    display: block;
    font-size: 28px;
    font-weight: bold;
    color: #333;
  }
  .label {
    font-size: 16px;
    color: #777;
  }
  
  /* Responsividade */
  @media (max-width: 1024px) {
    .dashboard-modal {
      width: 80%;
      height: auto;
    }
  }
  @media (max-width: 650px) {
    .dashboard-modal {
      padding: 15px;
    }
    .cards {
      grid-template-areas:
        "postagens"
        "comentarios"
        "analytics";
      grid-template-columns: 1fr;
      grid-template-rows: auto;
    }
  }
  </style>
  