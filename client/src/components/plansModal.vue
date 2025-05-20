<template>
    <div class="plans-modal">
        <h1>GoToMarket - Instagram</h1>
        <img src="@/assets/plans/arrow_back.svg" alt="Arrow back" class="arrow-back-icon" @click="$router.push('/home')" />
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


html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* só scroll vertical */
}
.plans-modal {
  position: relative;
    background-color: #f2f2f2;
    border: 2px solid #ccc;
    border-radius: 30px;
    padding: 20px;
    width: 50%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

  .arrow-back-icon {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 25px;
    height: 25px;
    cursor: pointer;
  }

.plans-modal h1 {
    margin-top: 40px;
    font-size: 32px;
    color: #333;
    font-weight: bold;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    margin-bottom: px;
}

.plans-modal h2 {
    margin-bottom: 140px;
    font-size: 18px;
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
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    background-color: #fff;
}

.container h2 {
    font-size: 24px;
    color: #333;
    font-weight: bold;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 0px; /* Reduced spacing */
}

.container .Bronze {
    color: #CD7F32;
    font-size: 24px;
    margin-bottom: 0px; /* Reduced spacing */
}

.container .Silver {
    color: #C0C0C0;
    font-size: 24px;
    margin-bottom: 0px; /* Reduced spacing */
}

.container .Gold {
    color: #FFD700;
    font-size: 24px;
    margin-bottom: 0px; /* Reduced spacing */
}

.container h3 {
    font-size: 18px;
    color: #333;
    font-weight: bold;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 0px; /* Reduced spacing */
}

.container h4 {
    font-size: 12px;
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
    width: 30px;
    height: 30px;
    margin-top: -80px;
    margin-bottom: 60px;
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
    width: 80%;
    height: auto;
    padding: 30px;
  }

  input,
  button {
    width: 90%;
    font-size: 24px;
  }

  .plans-modal h2 {
    font-size: 20px;
  }

  .padlock-icon {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 650px) {
  
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden; /* Remove a rolagem horizontal */
}

   .plans-modal {
    margin-top: 100px;
    flex-direction: column;
    overflow-x: hidden; /* Remove a rolagem horizontal */
    max-width: 100%;
    max-height: 100%;
    width: 300px;
    height: 700px;
    padding: 10x;
  }

  .plans-modal h1 {
    font-size: 20px;
    margin: 10px 0 5px;
  }
  .plans-modal h2 {
    font-size: 13px;
  }

.container-group {
    max-width: 100%;
    max-height: 60%;
    flex-direction: column;
    padding: 0;
    margin: 0;
}

  .container {
    width: 100%;
    padding: 8px;

  }

  .container h2 {
    font-size: 18px;
    margin-bottom: 0;
  }
  .container .Bronze,
  .container .Silver,
  .container .Gold {
    font-size: 18px;
    margin-bottom: 0;
  }
  .container h3 {
    font-size: 14px;
    margin-bottom: 4px;
  }
  .container h4 {
    font-size: 10px;
  }

  button {
    width: 100%;
    max-width: 340px;   /* botão não cola na borda */
    height: 32px;
    font-size: 18px;
    margin: 10px auto 12px;
  }

  .payment-image {
    width: 24px;
    height: 24px;
    margin: -40px auto 8px;
    display: block;
  }

  h3.advise {
    font-size: 12px;
    
    display: none !important;

  }
}

</style>