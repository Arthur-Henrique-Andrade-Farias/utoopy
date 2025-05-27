<template>
  <div class="plans-modal">
    <h1>GoToMarket - Instagram</h1>
    <img
      src="@/assets/plans/arrow_back.svg"
      alt="Voltar"
      class="arrow-back-icon"
      @click="$router.push('/home')"
    />

    <h2>
      I.A. de gerenciamento de postagens, comentários e usuários no Instagram.
    </h2>

    <img
      src="@/assets/plans/payments.svg"
      alt="Payment"
      class="payment-image"
    />

    <div class="container-group">
      <div
        v-for="plan in plans"
        :key="plan.id"
        class="container"
        :class="plan.id"
      >
        <h2>{{ formatPrice(plan.price) }}</h2>
        <h2 :class="plan.idClass">{{ plan.name }}</h2>

        <template v-if="plan.id === 'bronze'">
          <h3>AutomatePosts</h3>
          <h4>
            Posts automatizados, alocação de horário, criação de imagens e
            descrições.
          </h4>
        </template>
        <template v-else-if="plan.id === 'silver'">
          <h3>AutomatePosts</h3>
          <h3>AutomateComments</h3>
          <h4>
            Comentários automatizados, resposta de comentários em suas postagens
            e gerenciamento de interações, além do incluso no plano Bronze.
          </h4>
        </template>
        <template v-else>
          <h3>AutomatePosts</h3>
          <h3>AutomateComments</h3>
          <h3>AutomateAdmin</h3>
          <h4>
            Administração automatizada, visualização e análise de "likes",
            "shares" e seguidores, configuração personalizada, além do incluso
            no plano Silver +.
          </h4>
        </template>

        <button
          :disabled="plan.selected"
          :class="{ selected: plan.selected }"
          @click="selectPlan(plan)"
        >
          {{ plan.selected ? 'Selecionado' : 'Selecionar' }}
        </button>
      </div>
    </div>

    <h3 class="advise">
      Valores passíveis de negociação, assim como os produtos em questão. Para
      mais informações, WhatsApp: 000000000000
    </h3>
  </div>
</template>

<script>
export default {
  name: 'PlansModal',
  data() {
    return {
      /* lista base visível mesmo se a chamada API falhar */
      plans: [
        { id: 'bronze', name: 'Bronze',   idClass: 'Bronze', price: 49.9, selected: false },
        { id: 'silver', name: 'Silver +', idClass: 'Silver', price: 79.9, selected: false },
        { id: 'gold',   name: 'Gold ++',  idClass: 'Gold',   price: 99.9, selected: false },
      ],
    }
  },
  mounted() {
    this.fetchPlans()
  },
  methods: {
    /* Atualiza apenas a flag de plano já contratado */
    async fetchPlans() {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch('/api/plans', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error('Falha ao buscar planos')
        const { plans: serverPlans } = await res.json()

        // sincronia: mantém todos os planos visíveis e só marca selected
        serverPlans.forEach((srv) => {
          const local = this.plans.find((p) => p.id === srv.id)
          if (local) local.selected = !!srv.selected
        })
      } catch (err) {
        console.error(err) // se falhar, lista padrão continua visível
      }
    },

    formatPrice(v) {
      return v.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      })
    },

    /* Modificado para redirecionar para a página de pagamento Kiwify */
    async selectPlan(plan) {
      // Se o plano já estiver selecionado, o botão estará desabilitado (:disabled="plan.selected").
      // Esta verificação é uma segurança adicional.
      if (plan.selected) {
        return;
      }

      // Redireciona o usuário para a página de pagamento.
      // A aba atual será alterada para esta URL.
      const paymentUrl = 'https://pay.kiwify.com.br/VxMIdHr';
      window.location.href = paymentUrl;

      // Qualquer lógica de backend para registrar a intenção de upgrade ou
      // lidar com o status do plano geralmente ocorreria APÓS uma confirmação
      // de pagamento bem-sucedida vinda da Kiwify (por exemplo, via webhook
      // para o seu backend ou um redirecionamento da Kiwify de volta para o seu site
      // com um status de transação).
      // console.log(`Redirecionando para pagamento do plano ${plan.id}: ${paymentUrl}`);
    },
  },
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

/* Reset básico e box-sizing */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  /* overflow-x: hidden; /* Já está aqui, bom para evitar scroll horizontal */
  width: 100%;
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  background-color: #e0e0e0; /* Um fundo para a página, para o modal se destacar */
}

.plans-modal {
  position: relative;
  background-color: #f2f2f2;
  border: 2px solid #ccc;
  border-radius: 30px;
  padding: 20px 25px; /* Um pouco mais de padding horizontal */
  width: 90%; /* Começa responsivo */
  max-width: 1100px; /* Limite máximo para telas grandes */
  min-height: 80vh; /* Ocupa boa parte da altura da viewport */
  max-height: 95vh; /* Evita que seja maior que a tela */
  margin: 2.5vh auto; /* Centraliza e dá espaço vertical */
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto; /* Permite scroll interno se o conteúdo for muito grande */
  -webkit-overflow-scrolling: touch; /* Melhora scroll em iOS */
}

.arrow-back-icon {
  position: absolute;
  top: 25px;
  left: 25px;
  width: 28px; /* Um pouco maior para toque */
  height: 28px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}
.arrow-back-icon:hover {
  transform: scale(1.1);
}

.plans-modal h1 {
  margin-top: 30px; /* Espaço para o ícone de voltar */
  font-size: clamp(24px, 4vw, 32px); /* Fonte responsiva */
  color: #333;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
}

/* Subtítulo principal do modal */
.plans-modal > h2 {
  font-size: clamp(16px, 2.5vw, 18px); /* Fonte responsiva */
  color: #444;
  text-align: center;
  font-weight: normal;
  margin-bottom: 20px;
  max-width: 90%; /* Para não ficar muito largo */
  line-height: 1.5;
}

.payment-image {
  width: clamp(40px, 8vw, 60px); /* Tamanho responsivo */
  height: clamp(40px, 8vw, 60px);
  margin-top: 15px;
  margin-bottom: 25px;
  /* Estilos de borda/fundo foram removidos para simplificar,
     presumindo que a imagem já tenha o visual desejado.
     Se a intenção era um "badge", adicione de volta e ajuste. */
  /* border: 10px solid white; */
  /* background-color: white; */
  /* border-radius: 50%; */
}

.container-group {
  display: flex;
  flex-wrap: wrap; /* Permite que os itens quebrem para a próxima linha */
  justify-content: center; /* Centraliza os cards quando há espaço */
  gap: 20px; /* Espaço entre os cards */
  width: 100%;
  margin-bottom: 25px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* Empurra o botão para baixo */
  width: 100%; /* Ocupa todo o espaço disponível no flex-item (controlado pelo flex-basis abaixo) */
  flex-basis: 300px; /* Largura base para cada card */
  flex-grow: 1; /* Permite que os cards cresçam para preencher o espaço */
  max-width: 350px; /* Largura máxima para cada card */
  min-height: 420px; /* Altura mínima, mas permite crescer */
  border: 1px solid #ccc;
  border-radius: 15px; /* Bordas mais suaves */
  padding: 20px;
  background-color: #fff;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Sombra sutil */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.container:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}


/* Preço e Nome do Plano */
.container h2 {
  font-size: clamp(20px, 3vw, 24px);
  color: #333;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 5px;
}

.container .Bronze { color: #CD7F32; margin-bottom: 15px; }
.container .Silver { color: #C0C0C0; margin-bottom: 15px; }
.container .Gold   { color: #FFD700; margin-bottom: 15px; }

/* Títulos das features (AutomatePosts etc) */
.container h3 {
  font-size: clamp(15px, 2.5vw, 17px);
  color: #333;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
}

/* Descrições das features */
.container h4 {
  font-size: clamp(12px, 2vw, 14px);
  color: #555;
  font-weight: normal;
  line-height: 1.45;
  margin-bottom: 20px; /* Espaço antes do botão */
  flex-grow: 1; /* Permite que a descrição ocupe espaço vertical */
  min-height: 60px; /* Garante um espaço mínimo para descrições curtas */
}

button,
.container button { /* Especificidade para botões dentro do container */
  height: 42px;
  width: 85%;
  max-width: 220px;
  font-weight: bold;
  font-size: clamp(15px, 2.5vw, 18px);
  border-radius: 8px;
  cursor: pointer;
  margin-top: auto; /* Garante que o botão fique na parte inferior */
  margin-bottom: 5px; /* Pequena margem inferior */
  color: white;
  background-color: black;
  border: none;
  padding: 0 15px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

button:hover:not(:disabled) {
  background-color: #333; /* Escurece um pouco no hover */
  transform: scale(1.03);
}

button:disabled,
button.selected {
  background-color: #5cb85c; /* Verde para selecionado ou desabilitado (se for a mesma lógica) */
  color: white;
  cursor: not-allowed;
  opacity: 0.8; /* Um pouco de opacidade para o estado desabilitado */
}
button.selected:hover {
  background-color: #4cae4c; /* Mantém ou escurece levemente no hover do selecionado */
  transform: none; /* Sem scale no hover do selecionado */
}

/* Ensure no unclosed CSS rules below this point */


h3.advise {
  font-size: clamp(12px, 2vw, 14px);
  color: #333;
  font-weight: normal;
  text-align: center;
  margin-top: 20px;
  padding: 0 20px;
  width: 100%;
  line-height: 1.5;
}

/* === MEDIA QUERIES === */

/* Telas médias (tablets em paisagem, laptops pequenos) */
@media (max-width: 1024px) {
  .plans-modal {
    padding: 20px;
    margin: 3vh auto;
  }

  .container {
    min-height: 400px; /* Ajusta altura mínima */
  }
}

/* Telas pequenas (tablets em retrato, celulares grandes) */
@media (max-width: 768px) {
  .plans-modal {
    width: 95%;
    padding: 15px;
    margin: 2vh auto;
    border-radius: 20px;
  }

  .arrow-back-icon {
    top: 18px;
    left: 18px;
    width: 26px;
    height: 26px;
  }

  .plans-modal h1 {
    margin-top: 35px; /* Mais espaço para o ícone de voltar */
  }

  .container-group {
    flex-direction: column; /* Empilha os cards */
    align-items: center; /* Centraliza os cards empilhados */
    gap: 25px; /* Aumenta o espaço entre cards empilhados */
  }

  .container {
    flex-basis: auto; /* Permite que a largura seja 100% do pai (controlado abaixo) */
    width: 90%; /* Cards ocupam mais da largura quando empilhados */
    max-width: 450px; /* Mas não excessivamente largos */
    min-height: auto; /* Altura totalmente baseada no conteúdo */
    padding: 15px;
  }

  .container h4 {
    min-height: 40px; /* Ajusta altura mínima da descrição */
  }

  button,
  .container button {
    width: 90%;
  }

  h3.advise {
    margin-top: 25px;
  }
}

/* Telas muito pequenas (celulares) - Ajustes agressivos para compactação */
@media (max-width: 480px) {
  .plans-modal {
    width: 96%; /* Um pouco mais de largura para o modal em si */
    padding: 10px 8px; /* Padding horizontal e vertical reduzidos */
    border-radius: 10px; /* Raio da borda menor */
    margin: 8px auto;   /* Margem superior/inferior reduzida */
    min-height: 0;
    height: auto;
    max-height: 95vh; /* Mantém o limite de altura com scroll */
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .arrow-back-icon {
    top: 12px;
    left: 12px;
    width: 22px; /* Ícone um pouco menor */
    height: 22px;
  }

  .plans-modal h1 { /* Título principal do Modal */
    margin-top: 28px; /* Ajustado para o ícone e padding */
    font-size: 18px; /* Reduzido (era ~24px, depois 20px) */
    overflow-wrap: break-word;
    hyphens: auto;
    margin-bottom: 5px; /* Margem inferior reduzida */
  }

  .plans-modal > h2 { /* Subtítulo do Modal */
    font-size: 13px; /* Reduzido (era ~16px, depois 14px) */
    max-width: 100%;
    overflow-wrap: break-word;
    hyphens: auto;
    line-height: 1.35;
    margin-bottom: 12px; /* Margem inferior reduzida */
  }

  .payment-image {
     width: 32px; /* Reduzido */
     height: 32px; /* Reduzido */
     margin-top: 8px;
     margin-bottom: 12px; /* Margem inferior reduzida */
  }

  .container-group {
    gap: 12px; /* Espaço entre os cards reduzido */
    width: 100%;
  }

  .container { /* Card do Plano */
    width: 95%; /* Largura do card dentro do modal */
    height: auto;
    min-height: unset;
    padding: 10px; /* Padding interno do card reduzido */
    box-shadow: 0 1px 2px rgba(0,0,0,0.07); /* Sombra ainda mais sutil */
    border-radius: 8px; /* Raio da borda menor */
    /* display: flex; flex-direction: column; justify-content: space-between; */ /* Do base */
  }
  .container:hover {
    transform: none;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07);
  }

  .container h2,
  .container h3,
  .container h4 {
    overflow-wrap: break-word;
    hyphens: auto;
  }

  /* Preço (primeiro h2 dentro do card) */
  .container > h2:first-child {
    font-size: 15px; /* Reduzido */
    font-weight: bold;
    margin-bottom: 2px; /* Bem justo */
  }

  /* Nome do Plano (h2 com classe .Bronze, .Silver, .Gold) */
  .container h2.Bronze,
  .container h2.Silver,
  .container h2.Gold {
    font-size: 16px; /* Reduzido */
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 8px; /* Margem inferior reduzida */
  }

  .container h3 { /* Títulos das features: AutomatePosts, etc. */
    font-size: 12px; /* Reduzido */
    font-weight: bold; /* Manter destaque */
    margin-top: 8px;
    margin-bottom: 3px; /* Bem justo */
  }

  .container h4 { /* Descrições das features */
    font-size: 11px; /* Reduzido (era 12px) */
    line-height: 1.3; /* Linha mais justa */
    min-height: unset;
    flex-grow: 1;
    margin-bottom: 8px; /* Espaço antes do botão reduzido */
  }

  button,
  .container button { /* Botão de Selecionar */
    height: 36px; /* Altura reduzida (mínimo para toque pode ser comprometido) */
    width: 90%; /* Mantém largura relativa */
    /* max-width: 200px; */ /* Pode remover se width: 90% for suficiente */
    font-size: 12px; /* Reduzido */
    font-weight: bold;
    padding: 0 8px; /* Padding interno do botão */
    border-radius: 5px; /* Raio da borda menor */
  }

  h3.advise { /* Texto de aviso no final */
    font-size: 10px; /* Extremamente reduzido */
    line-height: 1.25; /* Linha mais justa */
    padding: 0 8px; /* Padding horizontal reduzido */
    margin-top: 12px; /* Margem superior reduzida */
    overflow-wrap: break-word;
    hyphens: auto;
  }
}



</style>