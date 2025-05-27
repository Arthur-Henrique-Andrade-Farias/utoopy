<template>
    <div class="login-modal">
        <img class="padlock-icon" src="@/assets/login/padlock.svg" alt="padlock" />
        <h2>Login na Plataforma</h2>
        <div class="input-group">
            <input id="email" type="text" v-model="email" placeholder="Email" />
        </div>
        <div class="input-group">
            <input id="password" type="password" v-model="password" placeholder="Senha" />
        </div>
        <button @click="entrar">Entrar</button>
        <div class="login-links">
            <a href="#" class="forgot-password" @click.prevent="$router.push('/forgot-password')">Esqueceu sua Senha?</a>
            <a href="#" class="register" @click.prevent="$router.push('/register')">Registre-se aqui!</a>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/services/api';

const router   = useRouter();
const email    = ref('');
const password = ref('');

const entrar = async () => {
  try {
    const { data } = await api.post('/login', {
      email: email.value,
      password: password.value
    });

    localStorage.setItem('token', data.token);
    alert('Login efetuado com sucesso!');
    router.push('/home');                         
  } catch (err) {
    alert(err.response?.data?.msg || 'Credenciais inválidas');
  }
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.login-links {
    display: flex;
    justify-content: space-between;
    width: 350px;
    margin-top: -80px;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
}

.login-links a {
    color: black;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
}

.login-links a:hover {
    text-decoration: underline;
}

.padlock-icon {
    margin-top: 50px;
    width: 75px;
    height: 75px;
    margin-bottom: 20px;
    align-items: center;
    justify-content: center;
    border: 20px solid white;
    background-color: white;
    border-radius: 50%;
}


.login-modal {
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
.login-modal h2 {
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
  .login-modal {
    width: 80%;
    height: auto;
    padding: 30px;
  }

  input
   {
    width: 90%;
    font-size: 24px;
  }

  button {
    width: 50%;
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
  .login-modal {
    width: 70%;
    height: 50%;
  }

  input,
  button {
    width: 70%;
    height: 30%;
    font-size: 20px;
  }

  .login-modal h2 {
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

  .login-links {
    display: flex;
    width: 70%;
    margin-top: -90px;
    font-family: 'Roboto', sans-serif;
    font-size: 10px;
}
}

@media (max-width: 400px) {
  .login-modal {
    width: 90%; /* Modal ocupa mais largura na tela */
    max-width: 340px; /* Largura máxima para consistência */
    height: auto; /* Altura se ajusta ao conteúdo */
    padding: 25px 20px; /* Espaçamento interno */
    border-radius: 24px; /* Cantos arredondados */
    /* background-color: #f2f2f2; /* Mantém a cor de fundo original */
    /* border: 1px solid #ccc; /* Borda original, pode ser ajustada se desejar */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Alinha conteúdo ao topo */
    overflow-y: auto; /* Permite rolagem se necessário */
  }

  .padlock-icon {
    width: 40px; /* Tamanho do conteúdo da imagem (SVG) */
    height: 40px; /* Tamanho do conteúdo da imagem (SVG) */
    /* A borda base é 'border: 20px solid white;'.
       Reduzir 'border-width' aqui ajuda a diminuir o tamanho visual total do ícone
       em telas pequenas, tornando-o mais proporcional.
       Total diâmetro visual: 40px (conteúdo) + 2 * 10px (borda) = 60px.
    */
    border-width: 10px; 
    margin-top: 20px; /* Margem superior ajustada */
    margin-bottom: 20px; /* Margem inferior ajustada */
  }

  .login-modal h2 {
    font-size: 22px; /* Tamanho do título */
    line-height: 1.3;
    text-align: center;
    color: #333; /* Mantém cor original */
    margin-bottom: 25px; /* Espaço abaixo do título */
  }

  .input-group {
    width: 100%; /* Ocupa toda a largura do modal */
    margin-bottom: 18px; /* Espaçamento entre os grupos de input */
  }

  /* Estilos para os inputs dentro do .input-group */
  .input-group input {
    width: 100%; 
    height: 48px; /* Altura para melhor usabilidade (toque) */
    font-size: 16px; /* Tamanho da fonte */
    padding: 10px 15px; /* Espaçamento interno */
    padding-left: 45px; /* Espaço para o ícone (mail/key) */
    border-radius: 8px; /* Cantos arredondados */
    border: 1px solid #ddd; /* Borda suave */
    box-sizing: border-box; /* Padding e border não aumentam a largura total */
    margin-bottom: 0; /* Margem inferior é controlada pelo .input-group */
  }

  /* Ajustes para os ícones de placeholder (já existentes no seu CSS base) */
  /* Estes seletores aplicam-se diretamente ao input */
  input[type="password"]:placeholder-shown,
  input[type="text"]:placeholder-shown {
    background-size: 20px 20px; /* Tamanho dos ícones de email/senha */
    background-position: 12px center; /* Posição dos ícones */
  }

  input::placeholder {
    text-indent: 0px; /* Remove indentação extra, padding-left já acomoda o ícone */
    color: #888; /* Cor do placeholder */
  }

  button { /* Botão "Entrar" */
    width: 100%;
    height: 50px;
    font-size: 18px;
    font-weight: bold; /* Mantém negrito */
    border-radius: 8px;
    margin-top: 10px; /* Espaço após o último input group */
    margin-bottom: 25px; /* Espaço antes dos .login-links */
    /* color: white; (do base) */
    /* background-color: black; (do base) */
    box-sizing: border-box;
  }

  .login-links {
    display: flex;
    flex-direction: column; /* Links empilhados verticalmente */
    align-items: center; /* Links centralizados */
    width: 100%; /* Ocupa toda a largura */
    margin-top: 0; /* Remove a margem negativa para um fluxo natural */
    font-size: 14px; /* Tamanho da fonte dos links */
    gap: 12px; /* Espaço entre os links empilhados */
  }

  .login-links a {
    /* color: black; (do base) */
    /* text-decoration: none; (do base) */
    /* font-weight: bold; (do base) */
  }
}
</style>