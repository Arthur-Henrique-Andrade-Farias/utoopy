<template>
    <div class="dashboard-modal">
      <h2>GoToMarket – Dashboard</h2>
  
      <div class="cards">
        <!-- Postagens -->
        <div class="card postagens">
          <h3>Postagens</h3>
          <table>
            <thead>
              <tr>
                <th>Dia</th>
                <th>Hora</th>
                <th>Tema</th>
              </tr>
            </thead>
            <tbody>
              <!-- Linhas de exemplo (substitua pelos dados reais) -->
              <tr><td></td><td></td><td></td></tr>
              <tr><td></td><td></td><td></td></tr>
              <tr><td></td><td></td><td></td></tr>
            </tbody>
          </table>
        </div>
  
        <!-- Comentários -->
        <div class="card comentarios">
          <h3>Comentários</h3>
          <ul>
            <!-- Repita conforme o número de comentários -->
            <li v-for="n in 4" :key="n">
              <div class="avatar"></div>
              <div class="coment-text">
                <div class="line line-short"></div>
                <div class="line line-long"></div>
              </div>
            </li>
          </ul>
        </div>
  
        <!-- Analytics -->
        <div class="card analytics">
          <h3>Analytics</h3>
          <div class="metrics">
            <div class="metric">
              <span class="value">X</span>
              <span class="label">Posts</span>
            </div>
            <div class="metric">
              <span class="value">X</span>
              <span class="label">Likes</span>
            </div>
            <div class="metric">
              <span class="value">X</span>
              <span class="label">Seguidores</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'dashboardModal',
    // adicione props ou dados reativos aqui, se necessário
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  
  /* Container principal */
  .dashboard-modal {
    font-family: 'Roboto', sans-serif;
    background-color: #f2f2f2;
    border: 2px solid #ccc;
    border-radius: 30px;
    padding: 20px;
    width: 700px;
    height: 500px;
    display: flex;
    flex-direction: column;
  }
  
  .dashboard-modal h2 {
    text-align: center;
    color: #333;
    font-size: 32px;
    margin-bottom: 20px;
  }
  
  /* Grid de cards */
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
  
  /* Estilo base de cada card */
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
      width: 100%;
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
  