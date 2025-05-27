<template>
  <div class="register-modal">
    <img class="arrow-back" src="@/assets/register/arrow_back.svg" alt="Voltar" @click="$router.push('/')" />
    <img class="person-icon" src="@/assets/register/person.svg" alt="padlock" />
    <h2>Registrar na Plataforma</h2>
    <div class="input-group">
      <input id="email" type="text" v-model="email" placeholder="Email" />
    </div>
    <div class="input-group">
      <input id="password" type="password" v-model="password" placeholder="Senha" />
    </div>
    <div class="input-group">
      <input id="confirm-password" type="password" v-model="confirmPassword" placeholder="Confirmar Senha" />
    </div>
    <button @click="registrar">Registrar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/services/api';

const router          = useRouter();
const name            = ref('');
const email           = ref('');
const password        = ref('');
const confirmPassword = ref('');

const registrar = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value))               return alert('E-mail inválido');
  if (password.value !== confirmPassword.value)    return alert('Senhas diferentes');

  try {
    const { data } = await api.post('/register', {
      name: name.value || 'Usuário',
      email: email.value,
      password: password.value
    });

    localStorage.setItem('token', data.token);
    alert('Conta criada com sucesso! Faça login.');
    router.push('/');                         // 👈 redireciona
  } catch (err) {
    alert(err.response?.data?.msg || 'Erro ao registrar');
  }
};
</script>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');


.register-modal {
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

.arrow-back {
  position: absolute;      
  top: 16px;               
  left: 16px;              
  width: 25px;            
  height: 25px;
  cursor: pointer;
}

.person-icon {
    margin-top: 70px;
    width: 50px;
    height: 50px;
    margin-bottom: 20px;
    align-items: center;
    justify-content: center;
    border: 20px solid white;
    background-color: white;
    border-radius: 50%;
}

.register-modal h2 {
    margin-bottom: 20px;
    font-size: 42px;
    color: #333;
    margin-bottom: 50px;
    font-weight: bold;
    text-align: center;
    font-family: 'Roboto', sans-serif;
}

input {
    width: 350px;
    height: 30px;
    padding: 12px;
    font-size: 26px;
    border-radius: 10px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    font-family: 'Roboto', sans-serif;
}

input[type="password"] {
    background-color: white;
}

input[type="password"]:placeholder-shown {
    background: #fff url("@/assets/login/key.svg") no-repeat 8px center;
    background-size: 32px 32px;
}

input[type="text"] {
    background-color: white;
}

input[type="text"]:placeholder-shown {
    background: #fff url("@/assets/login/mail.svg") no-repeat 8px center;
    background-size: 32px 32px;
}

input::placeholder {
    text-indent: 30px;
}

button {
    height: 70px;
    width: 350px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 32px;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 100px;
    color: white;
    background-color: black;
    font-family: 'Roboto', sans-serif;

}

@media (max-width: 1024px) {
  .register-modal {
    width: 70%;
    height: 70%;
    padding: 30px;
  }

  input {
    width: 90%;
    font-size: 24px;
  }

  button {
    width: 70%;
    height: 70px;
    font-size: 24px;
  }

  .login-modal h2 {
    font-size: 32px;
  }

  .padlock-icon {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 650px) {

  .person-icon {
    margin-top: 80px;
    width: 50px;
    height: 50px;
  }

  .register-modal {
    width: 70%;
    height: 50%;
  }

  input,
  button {
    width: 70%;
    height: 30%;
    font-size: 20px;
  }

  .register-modal h2 {
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

@media (max-width: 400px) {
  .register-modal {
    width: 90%; /* O modal ocupa mais largura na tela pequena */
    max-width: 340px; /* Evita que fique excessivamente largo em telas um pouco maiores que 375px */
    height: auto; /* Altura se ajusta ao conteúdo */
    min-height: 480px; /* Altura mínima para acomodar o conteúdo visualizado na imagem */
    padding: 25px 20px; /* Espaçamento interno: 25px superior/inferior, 20px laterais */
    border-radius: 24px; /* Cantos arredondados consistentes com a imagem */
    background-color: white; /* Fundo branco como na imagem */
    border: 1px solid #e0e0e0; /* Borda sutil, se necessário, ou none */
    box-shadow: 0 4px 15px rgba(0,0,0,0.1); /* Sombra suave opcional para destaque */
    
    display: flex;
    flex-direction: column;
    align-items: center; /* Centraliza itens horizontalmente */
    justify-content: flex-start; /* Alinha o conteúdo ao topo */
    overflow-y: auto; /* Permite rolagem se o conteúdo exceder a altura */
  }

  .arrow-back {
    top: 25px; /* Ajuste da posição do ícone de voltar */
    left: 20px;
    width: 24px;
    height: 24px;
  }

  .person-icon {
    /* A estilização base do .person-icon (com border: 20px solid white) é um pouco usual.
       Esta media query ajustará margens e tamanho assumindo que width/height
       são para o círculo branco visível. */
    margin-top: 20px; /* Espaço após o topo/padding do modal */
    width: 50px;    /* Largura do ícone de pessoa (círculo) */
    height: 50px;   /* Altura do ícone de pessoa (círculo) */
    /* Se a borda de 20px do estilo base estiver ativa e causar problemas visuais,
       você pode querer redefinir/ajustar 'border' aqui também.
       Ex: border: none; ou border: 1px solid #ccc;
       Para este exemplo, manteremos a estrutura da borda original, ajustando apenas o tamanho visual.
    */
    margin-bottom: 15px; /* Espaço abaixo do ícone de pessoa */
  }

  .register-modal h2 {
    font-size: 22px; /* Tamanho da fonte do título "Registrar na Plataforma" */
    line-height: 1.3; /* Altura da linha para melhor leitura */
    color: #333;      /* Cor do título (mantendo do base) */
    margin-bottom: 25px; /* Espaço abaixo do título */
    margin-top: 0;
  }

  input {
    width: 100%; /* Campos de input ocupam toda a largura disponível */
    height: 48px; /* Altura aumentada para melhor toque */
    font-size: 16px; /* Tamanho da fonte nos inputs */
    padding: 10px 15px; /* Espaçamento interno dos inputs */
    padding-left: 45px; /* Espaço à esquerda para o ícone dentro do input */
    margin-bottom: 18px; /* Espaço entre os inputs */
    border-radius: 8px; /* Cantos arredondados para os inputs */
    border: 1px solid #ddd; /* Borda mais suave para os inputs */
    box-sizing: border-box; /* Garante que padding e border não aumentem a largura total */
  }

  input[type="password"]:placeholder-shown,
  input[type="text"]:placeholder-shown {
    background-size: 20px 20px; /* Tamanho dos ícones de email/senha */
    background-position: 12px center; /* Posição dos ícones */
  }

  input::placeholder {
    text-indent: 0px; /* Remove indentação extra do placeholder, padding-left já cuida disso */
    color: #888; /* Cor do placeholder um pouco mais suave */
  }

  button {
    width: 100%; /* Botão ocupa toda a largura */
    height: 50px; /* Altura do botão */
    font-size: 18px; /* Tamanho da fonte do botão */
    font-weight: bold;
    margin-top: 15px; /* Espaço acima do botão */
    margin-bottom: 0; /* Remove margem inferior, padding do modal cuidará do espaço */
    border-radius: 8px; /* Cantos arredondados do botão */
    background-color: black; /* Cor de fundo (mantendo do base) */
    color: white; /* Cor do texto (mantendo do base) */
    box-sizing: border-box;
  }
}
</style>