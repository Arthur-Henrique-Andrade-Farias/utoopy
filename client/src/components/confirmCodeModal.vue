<template>
  <div class="confirmCode-modal">
    <img class="arrow-back" src="@/assets/register/arrow_back.svg" alt="Voltar" @click="voltarParaLogin" />
    <img class="person-icon" src="@/assets/register/person.svg" alt="Ícone de pessoa" />
    <h2>Digite o código</h2>
    <p class="subtitle">Enviamos um código de verificação para {{ maskedEmail }}.</p>
    <div class="input-group">
      <input id="code" type="text" v-model="code" placeholder="Código de 6 dígitos" @keyup.enter="verificarCodigo" maxlength="6" />
    </div>
    <p v-if="message" :class="['message', isError ? 'error-message' : 'success-message']">{{ message }}</p>
    <button @click="verificarCodigo" :disabled="isLoading">
      {{ isLoading ? 'Verificando...' : 'Verificar Código' }}
    </button>
    <p class="resend-code" @click="reenviarCodigo" :class="{ 'disabled': resendCooldown > 0 }">
      {{ resendCooldown > 0 ? `Aguarde ${resendCooldown}s` : 'Reenviar código' }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const email = ref(''); // Será preenchido pelo parâmetro da rota
const code = ref('');
const message = ref('');
const isLoading = ref(false);
const isError = ref(false);

const resendCooldown = ref(0);
let cooldownInterval = null;

// Computa um email mascarado para exibição
const maskedEmail = computed(() => {
  if (!email.value) return '';
  const [localPart, domain] = email.value.split('@');
  if (!domain) return email.value; // caso não seja um email válido
  const maskedLocalPart = localPart.length > 3 
    ? `${localPart.substring(0, 2)}***${localPart.substring(localPart.length - 1)}`
    : `${localPart.substring(0, 1)}***`;
  return `${maskedLocalPart}@${domain}`;
});


onMounted(() => {
  // Tenta pegar o email do parâmetro da rota
  // Você precisará configurar sua rota para aceitar um parâmetro 'email'
  // Ex: path: '/confirm-code/:email'
  if (route.params.email) {
    email.value = route.params.email;
  } else {
    // Se o email não for passado, redirecionar ou mostrar erro
    message.value = 'Email não fornecido. Volte e tente novamente.';
    isError.value = true;
    // Considerar redirecionar para a tela de 'esqueceu a senha' ou login
    // router.push('/forgot-password');
  }
});

const startResendCooldown = () => {
  resendCooldown.value = 60; // 60 segundos de cooldown
  cooldownInterval = setInterval(() => {
    resendCooldown.value--;
    if (resendCooldown.value <= 0) {
      clearInterval(cooldownInterval);
    }
  }, 1000);
};

const reenviarCodigo = async () => {
  if (resendCooldown.value > 0 || !email.value) return;

  isLoading.value = true;
  message.value = '';
  isError.value = false;
  try {
    // Reutiliza a API de /api/forgot-password para reenviar
    await axios.post('https://utoopy-backend.onrender.com/api/forgot-password', {
      email: email.value,
    });
    message.value = 'Um novo código foi enviado para o seu email.';
    isError.value = false;
    startResendCooldown();
  } catch (error) {
    console.error('Erro ao reenviar código:', error);
    message.value = error.response?.data?.message || 'Não foi possível reenviar o código.';
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};


const verificarCodigo = async () => {
  if (!code.value || code.value.length !== 6) {
    message.value = 'Por favor, insira um código de 6 dígitos.';
    isError.value = true;
    return;
  }
  if (!email.value) {
    message.value = 'Email não encontrado. Por favor, tente o processo novamente.';
    isError.value = true;
    return;
  }

  isLoading.value = true;
  message.value = '';
  isError.value = false;

  try {
    const response = await axios.post('https://utoopy-backend.onrender.com/api/verify-recovery-code', {
      email: email.value,
      token: code.value,
    });
    message.value = response.data.message;
    isError.value = false;
    // Navegar para a próxima tela (changePass) passando email e código como props ou params
    router.push({ 
      name: 'ChangePassword', // Certifique-se que sua rota tem esse nome
      params: { email: email.value, code: code.value } // Passando como parâmetros de rota
    });
  } catch (error) {
    console.error('Erro ao verificar código:', error);
    message.value = error.response?.data?.message || 'Código inválido ou expirado.';
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const voltarParaLogin = () => {
  router.push('/'); // ou para a tela de 'esqueceu a senha'
};

// Limpa o intervalo quando o componente é desmontado
import { onUnmounted } from 'vue';
onUnmounted(() => {
  if (cooldownInterval) {
    clearInterval(cooldownInterval);
  }
});
</script>

<style scoped>
/* Seu CSS existente, com pequenas correções e adições */
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.confirmCode-modal {
    position: relative;
    background-color: #f2f2f2;
    border: 2px solid #ccc;
    border-radius: 30px;
    padding: 20px;
    width: 50%;
    min-height: 70%; /* Ajustado para min-height */
    max-width: 600px; /* Adicionado para melhor controle em telas largas */
    margin: auto; /* Centralizar */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}

.arrow-back {
  position: absolute;      
  top: 20px; /* Ajustado */
  left: 20px;  /* Ajustado */
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

.confirmCode-modal h2 { /* Corrigido seletor, se necessário */
    font-size: 36px; /* Ajustado */
    color: #333;
    margin-bottom: 10px; /* Ajustado */
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
    width: 300px; /* Ajustado */
    max-width: 100%;
    height: 30px;
    padding: 12px;
    font-size: 22px; /* Ajustado */
    border-radius: 10px;
    border: 1px solid #ccc;
    margin-bottom: 15px; /* Ajustado */
    font-family: 'Roboto', sans-serif;
    text-align: center; /* Para códigos */
}

input::placeholder {
    text-indent: 0px; /* Ajustado para placeholder centralizado */
    text-align: center;
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

.resend-code {
  font-size: 14px;
  color: #4E4794;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 30px; /* Espaço no final */
  font-family: 'Roboto', sans-serif;
}
.resend-code.disabled {
  color: #999;
  cursor: not-allowed;
}


/* Media queries podem precisar de ajustes com base nas mudanças acima */
@media (max-width: 768px) { /* Ajustado breakpoint */
  .confirmCode-modal {
    width: 90%;
    padding: 20px 15px;
  }
  .confirmCode-modal h2 {
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
}

/* Adicione ao <style scoped> do confirmCode-modal.vue */

@media (max-width: 420px) {
  .confirmCode-modal {
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

  .confirmCode-modal h2 { /* Título "Digite o código" */
    font-size: 20px;
    margin-bottom: 8px;
    line-height: 1.3;
  }

  .subtitle { /* "Enviamos um código..." */
    font-size: 12px;
    line-height: 1.4;
    margin-bottom: 20px;
    padding: 0 5px; /* Para evitar que texto longo toque as bordas */
    overflow-wrap: break-word;
  }

  .input-group {
    width: 100%;
  }

  input#code { /* Input do código de 6 dígitos */
    width: 100%;
    max-width: 200px; /* Limita largura para melhor estética do código */
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
    font-size: 18px; /* Fonte maior para visibilidade do código */
    height: 48px; /* Mais alto para facilitar a digitação */
    padding: 10px;
    text-align: center;
    letter-spacing: 0.1em; /* Espaçamento entre dígitos (opcional) */
    margin-bottom: 15px;
    border-radius: 8px;
  }
  input#code::placeholder {
    text-indent: 0;
    text-align: center;
    letter-spacing: normal; /* Placeholder sem espaçamento extra */
  }

  button { /* Botão "Verificar Código" */
    width: 100%;
    box-sizing: border-box;
    height: 44px;
    font-size: 15px;
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

  .resend-code { /* Texto "Reenviar código" */
    font-size: 12px;
    margin-top: 8px;
    margin-bottom: 20px; /* Espaço no final do modal */
  }
}
</style>