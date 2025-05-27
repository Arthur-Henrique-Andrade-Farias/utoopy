<template>
  <div class="changePass-modal">
    <img class="arrow-back" src="@/assets/register/arrow_back.svg" alt="Voltar" @click="voltarParaLogin" />
    <img class="person-icon" src="@/assets/register/person.svg" alt="Ícone de pessoa" />
    <h2>Defina sua Nova Senha</h2>
    <p class="subtitle">Escolha uma senha forte para proteger sua conta.</p>
    <div class="input-group">
      <input id="password" type="password" v-model="password" placeholder="Nova Senha" @keyup.enter="redefinirSenha" />
    </div>
    <div class="input-group">
      <input id="confirm-password" type="password" v-model="confirmPassword" placeholder="Confirmar Senha" @keyup.enter="redefinirSenha" />
    </div>
    <p v-if="message" :class="['message', isError ? 'error-message' : 'success-message']">{{ message }}</p>
    <button @click="redefinirSenha" :disabled="isLoading">
      {{ isLoading ? 'Salvando...' : 'Redefinir Senha' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const email = ref(''); // Virá da rota
const code = ref('');  // Virá da rota
const password = ref('');
const confirmPassword = ref('');
const message = ref('');
const isLoading = ref(false);
const isError = ref(false);

onMounted(() => {
  // Pega email e código dos parâmetros da rota
  // Ex: path: '/change-password/:email/:code'
  if (route.params.email && route.params.code) {
    email.value = route.params.email;
    code.value = route.params.code;
  } else {
    message.value = 'Dados de recuperação inválidos. Tente o processo novamente.';
    isError.value = true;
    // Considerar redirecionar ou impedir ação
  }
});

const redefinirSenha = async () => {
  if (!password.value || !confirmPassword.value) {
    message.value = 'Por favor, preencha ambos os campos de senha.';
    isError.value = true;
    return;
  }
  if (password.value !== confirmPassword.value) {
    message.value = 'As senhas não coincidem.';
    isError.value = true;
    return;
  }
  if (password.value.length < 6) { // Exemplo de validação de senha
    message.value = 'A senha deve ter pelo menos 6 caracteres.';
    isError.value = true;
    return;
  }
  if (!email.value || !code.value) {
     message.value = 'Não foi possível verificar os dados de recuperação. Tente novamente desde o início.';
     isError.value = true;
     return;
  }

  isLoading.value = true;
  message.value = '';
  isError.value = false;

  try {
    const response = await axios.post('https://utoopy-backend.onrender.com/api/reset-password', {
      email: email.value,
      token: code.value,
      newPassword: password.value,
    });
    message.value = response.data.message + " Você será redirecionado para o login.";
    isError.value = false;
    setTimeout(() => {
      router.push('/');
    }, 3000); // Redireciona após 3 segundos
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    message.value = error.response?.data?.message || 'Não foi possível redefinir a senha.';
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const voltarParaLogin = () => {
  router.push('/');
};
</script>

<style scoped>
/* Seu CSS existente, com pequenas correções e adições */
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.changePass-modal {
    position: relative;
    background-color: #f2f2f2;
    border: 2px solid #ccc;
    border-radius: 30px;
    padding: 20px;
    width: 50%;
    min-height: 70%;
    max-width: 600px;
    margin: auto;
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
    margin-top: 50px;
    width: 50px;
    height: 50px;
    margin-bottom: 20px;
    border: 20px solid white;
    background-color: white;
    border-radius: 50%;
}

.changePass-modal h2 { /* Corrigido seletor, se necessário */
    font-size: 36px;
    color: #333;
    margin-bottom: 10px;
    font-weight: bold;
    text-align: center;
    font-family: 'Roboto', sans-serif;
}
.subtitle {
  font-size: 16px;
  color: #555;
  margin-bottom: 25px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
}

input {
    width: 300px;
    max-width: 100%;
    height: 30px;
    padding: 12px;
    font-size: 22px;
    border-radius: 10px;
    border: 1px solid #ccc;
    margin-bottom: 15px;
    font-family: 'Roboto', sans-serif;
}

input[type="password"] {
    background-color: white;
}
input[type="password"]:placeholder-shown {
    background: #fff url("@/assets/login/key.svg") no-repeat 8px center;
    background-size: 32px 32px;
}
input::placeholder {
    text-indent: 30px;
}


button {
    height: 60px;
    width: 300px;
    max-width: 100%;
    font-weight: bold;
    font-size: 28px;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 15px;
    color: white;
    background-color: black;
    font-family: 'Roboto', sans-serif;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.message {
  min-height: 20px;
  margin-bottom: 15px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  text-align: center;
  width: 300px;
  max-width: 100%;
}
.success-message { color: green; }
.error-message { color: red; }

/* Media queries podem precisar de ajustes */
@media (max-width: 768px) {
  .changePass-modal {
    width: 90%;
    padding: 20px 15px;
  }
  .changePass-modal h2 {
    font-size: 28px;
  }
   .subtitle {
    font-size: 14px;
  }
  input, button, .message {
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

/* Adicione ao <style scoped> do changePass-modal.vue */

@media (max-width: 420px) {
  .changePass-modal {
    width: 95%;
    padding: 15px 10px;
    min-height: 0;
    height: auto;
    margin: 10vh auto auto auto;
    border-radius: 20px;
    justify-content: flex-start;
  }

  .arrow-back {
    top: 15px;
    left: 15px;
    width: 22px;
    height: 22px;
  }

  .person-icon {
    width: 36px;
    height: 36px;
    border-width: 5px; /* Borda branca bem reduzida */
    margin-top: 30px;
    margin-bottom: 15px;
  }

  .changePass-modal h2 { /* Título "Defina sua Nova Senha" */
    font-size: 20px;
    margin-bottom: 8px;
    line-height: 1.3;
  }

  .subtitle { /* "Escolha uma senha forte..." */
    font-size: 12px;
    line-height: 1.4;
    margin-bottom: 20px;
    padding: 0 5px;
    overflow-wrap: break-word;
  }

  .input-group {
    width: 100%;
  }

  input[type="password"] { /* Inputs de Nova Senha e Confirmar Senha */
    width: 100%;
    box-sizing: border-box;
    font-size: 15px;
    height: 44px;
    padding: 10px;
    padding-left: 38px; /* Espaço para o ícone de chave */
    margin-bottom: 12px; /* Espaço entre os inputs de senha */
    border-radius: 8px;
  }

  input[type="password"]:placeholder-shown {
    background-size: 20px 20px; /* Ícone menor */
    background-position: 10px center; /* Posição ajustada */
  }

  input::placeholder {
    text-indent: 0;
  }

  button { /* Botão "Redefinir Senha" */
    width: 100%;
    box-sizing: border-box;
    height: 44px;
    font-size: 15px;
    margin-top: 5px; /* Pequena margem acima do botão */
    margin-bottom: 10px;
    border-radius: 8px;
  }

  .message { /* Mensagens de sucesso/erro */
    width: 100%;
    box-sizing: border-box;
    font-size: 12px;
    margin-bottom: 10px;
    line-height: 1.4;
    min-height: 28px;
    overflow-wrap: break-word;
  }
}
</style>