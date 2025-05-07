<template>
    <div class="plans-modal">
        <h1>GoToMarket - Instagram</h1>
        <h2>I.A. de gerenciamento de postagens, comentários e usuários no Instagram.</h2>
        <img src="@/assets/plans/payments.svg" alt="Payment" class="payment-image" />
        <div class="container-group">
            <div class="container">
                <h2>R$49,90</h2>
                <h2 class="Bronze">Bronze</h2>
                <h3>AutomatePosts</h3> 
                <h4>Posts automatizados, alocação de horário, criação de imagens e descrições.</h4>                
                <button @click="entrar">Selecionar</button>
            </div>
            <div class="container">
                <h2>R$79,90</h2>
                <h2 class="Silver">Silver +</h2>
                <h3>AutomatePosts</h3> 
                <h3>AutomateComments</h3> 
                <h4>Comentários automatizados, resposta de comentários em suas postagens, e gerenciamento de interações, além do incluso no plano Bronze.</h4>             
                <button @click="entrar">Selecionar</button>
            </div>
            <div class="container">
                <h2>R$99,90</h2>
                <h2 class="Gold">Gold ++</h2>
                <h3>AutomatePosts</h3> 
                <h3>AutomateComments</h3>
                <h3>AutomateAdmin</h3>  
                <h4>Administração automatizada, visualização e análise de "likes", "shares" e seguidores, configuração personalizada, além do incluso no plano Silver + .</h4>                                                  
                <button @click="entrar">Selecionar</button>
            </div>
        </div>
        <h3 class="advise">Valores passíveis de negociação, assim como os produtos em questão. Para mais informações, whatsApp: 000000000000</h3>
    </div>
</template>

<script>
export default {
    name: 'loginModal',
    data() {
        return { email: '', password: '' }
    },
    methods: {
        entrar() {
            console.log('Login com:', this.email, this.password)
        }
    }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.plans-modal {
    background-color: #f2f2f2;
    border: 2px solid #ccc;
    border-radius: 30px;
    padding: 20px;
    width: 1200px;
    height: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.plans-modal h1 {
    margin-top: 40px;
    font-size: 60px;
    color: #333;
    font-weight: bold;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    margin-bottom: -5px; /* Reduced spacing */
}

.plans-modal h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
    text-align: center;
    font-weight: normal;
    font-family: 'Roboto', sans-serif;
}

.container-group {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 30%;
    height: 700px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    background-color: #fff;
    margin-bottom: 100px;
}

.container h2 {
    font-size: 42px;
    color: #333;
    font-weight: bold;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    margin-bottom: -20px; /* Reduced spacing */
}

.container .Bronze {
    color: #CD7F32;
    font-size: 60px;
    margin-bottom: 10px; /* Reduced spacing */
}

.container .Silver {
    color: #C0C0C0;
    font-size: 60px;
    margin-bottom: 10px; /* Reduced spacing */
}

.container .Gold {
    color: #FFD700;
    font-size: 60px;
    margin-bottom: 10px; /* Reduced spacing */
}

.container h3 {
    font-size: 32px;
    color: #333;
    font-weight: bold;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 8px; /* Reduced spacing */
}

.container h4 {
    font-size: 18px;
    margin-bottom: 100px;
    color: #333;
    font-weight: normal;
    text-align: center;
    font-family: 'Roboto', sans-serif;
}

button {
    height: 40px;
    width: 150px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 26px;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 20px;
    color: white;
    background-color: #4E4794;
    font-family: 'Roboto', sans-serif;

}

.payment-image {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
    border: 20px solid white;
    background-color: white;
    border-radius: 50%;
}

h3.advise {
    font-size: 14px;
    color: #333;
    font-weight: normal;    
    text-align: center;
    font-family: 'Roboto', sans-serif;
    margin-top: 20px;
}

@media (max-width: 1024px) {
  .plans-modal {
    width: 90%;
    height: auto;
    padding: 30px;
  }

  input,
  button {
    width: 90%;
    font-size: 24px;
  }

  .plans-modal h2 {
    font-size: 32px;
  }

  .padlock-icon {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 650px) {
  .plans-modal {
    width: 70%;
    height: 50%;
  }

  input,
  button {
    width: 70%;
    height: 30%;
    font-size: 20px;
  }

  .plans-modal h2 {
    font-size: 26px;
  }

  .padlock-icon {
    width: 50px;
    height: 50px;
  }
  
  .button {
    height: 70%;
    width: 70%;
    font-size: 20px;
  }

}
</style>