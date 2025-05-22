<template>
  <div class="forgotPass-modal">
    <img class="arrow-back" src="@/assets/register/arrow_back.svg" alt="Voltar" @click="$router.push('/login')" />
    <img class="person-icon" src="@/assets/register/person.svg" alt="Ícone de cadeado" /> <h2>Esqueceu a Senha</h2>
    <div class="input-group">
      <input id="email" type="email" v-model="email" placeholder="Email" @keyup.enter="solicitarCodigo" />
    </div>
    <p v-if="message" :class="{ 'success-message': !isError, 'error-message': isError }">{{ message }}</p>
    <button @click="solicitarCodigo" :disabled="isLoading">
      {{ isLoading ? 'Enviando...' : 'Enviar código' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // 1. Importe o useRouter
import axios from 'axios';

const email = ref('');
const message = ref('');
const isLoading = ref(false);
const isError = ref(false);

const router = useRouter(); // 2. Inicialize o router

const solicitarCodigo = async () => {
  if (!email.value) {
    message.value = 'Por favor, insira seu email.';
    isError.value = true;
    return;
  }
  // Validação simples de email (opcional, mas recomendada)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    message.value = 'Por favor, insira um email válido.';
    isError.value = true;
    return;
  }


  isLoading.value = true;
  message.value = ''; // Limpa mensagens anteriores
  isError.value = false;

  try {
// eslint-disable-next-line no-unused-vars
    const response = await axios.post('http://localhost:3000/api/forgot-password', {
      email: email.value,
    });
    
    // Não definimos a mensagem aqui, pois vamos redirecionar.
    // A próxima página pode mostrar uma mensagem como "Código enviado para seuemail@example.com"

    // 3. Redirecionar para a tela de confirmação de código, passando o email como parâmetro
    // Certifique-se de que a rota 'ConfirmCode' está configurada para aceitar um parâmetro 'email'
    // Ex: path: '/confirm-code/:email' no seu arquivo de rotas (router/index.js)
    router.push({ name: 'ConfirmCode', params: { email: email.value } });
    
    // Se você ainda quiser mostrar uma mensagem rápida antes do redirect (pouco comum):
    // message.value = response.data.message;
    // isError.value = false;
    // setTimeout(() => {
    //   router.push({ name: 'ConfirmCode', params: { email: email.value } });
    // }, 1000); // Espera 1 segundo

  } catch (error) {
    console.error('Erro ao solicitar código de recuperação:', error);
    if (error.response && error.response.data && error.response.data.message) {
      message.value = error.response.data.message;
    } else {
      message.value = 'Não foi possível enviar o código. Tente novamente mais tarde.';
    }
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Seu CSS existente */
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.forgotPass-modal {
    position: relative;
    background-color: #f2f2f2;
    border: 2px solid #ccc;
    border-radius: 30px;
    padding: 20px;
    width: 50%;
    min-height: 70%; /* Ajustado para min-height */
    max-width: 600px; /* Adicionado para melhor controle */
    margin: auto; /* Centralizar */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}

.arrow-back {
  position: absolute;      
  top: 20px;               
  left: 20px;              
  width: 25px;            
  height: 25px;
  cursor: pointer;
}

.person-icon {
    margin-top: 50px; /* Ajustado */
    width: 50px;
    height: 50px;
    margin-bottom: 20px;
    border: 20px solid white;
    background-color: white;
    border-radius: 50%;
}

.forgotPass-modal h2 {
    margin-bottom: 30px; /* Ajustado */
    font-size: 36px; /* Ajustado */
    color: #333;
    font-weight: bold;
    text-align: center;
    font-family: 'Roboto', sans-serif;
}

input {
    width: 300px; /* Ajustado */
    max-width: 100%;
    height: 30px;
    padding: 12px;
    font-size: 22px; /* Ajustado */
    border-radius: 10px;
    border: 1px solid #ccc;
    margin-bottom: 15px; /* Ajustado */
    font-family: 'Roboto', sans-serif;
}

input[type="email"] { /* Especificidade para o input de email */
    background-color: white;
}

input[type="email"]:placeholder-shown {
    background: #fff url("@/assets/login/mail.svg") no-repeat 8px center;
    background-size: 32px 32px;
}

input::placeholder {
    text-indent: 30px;
}

button {
    height: 60px; /* Ajustado */
    width: 300px; /* Ajustado */
    max-width: 100%;
    font-weight: bold;
    font-size: 28px; /* Ajustado */
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 15px; /* Ajustado */
    color: white;
    background-color: #4E4794;
    font-family: 'Roboto', sans-serif;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

p {
  min-height: 20px;
  margin-bottom: 15px; /* Ajustado */
  font-family: 'Roboto', sans-serif;
  font-size: 14px; /* Ajustado */
  text-align: center;
  width: 300px; /* Ajustado */
  max-width: 100%;
}

.success-message {
  color: green;
}

.error-message {
  color: red;
}

/* Media queries podem precisar de ajustes com base nas mudanças acima */
@media (max-width: 768px) { /* Ajustado breakpoint */
  .forgotPass-modal {
    width: 90%;
    padding: 20px 15px;
  }
  .forgotPass-modal h2 {
    font-size: 28px;
  }
  input, button, p {
    width: 90%;
  }
  button {
    font-size: 22px;
    height: 50px;
  }
   input {
    font-size: 18px;
  }
  input::placeholder {
    text-indent: 25px; /* Ajuste para ícone */
    background-size: 24px 24px !important; /* Ajuste para ícone */
  }
}

@media (max-width: 650px) { /* Mantendo seu breakpoint original, pode necessitar ajustes */
  .person-icon {
    margin-top: 30px; /* Ajustado */
  }

  .forgotPass-modal h2 {
    font-size: 24px; /* Ajustado */
  }
  p {
    font-size: 13px;
  }
}
</style>