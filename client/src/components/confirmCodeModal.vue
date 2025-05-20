<template>
  <div class="confirmCode-modal">
    <img class="arrow-back" src="@/assets/register/arrow_back.svg" alt="Voltar" @click="$router.push('/login')" />
    <img class="person-icon" src="@/assets/register/person.svg" alt="padlock" />
    <h2>Digite o código no campo abaixo</h2>
    <div class="input-group">
      <input id="email" type="text" v-model="email" placeholder="Código" />
    </div>

    <button @click="registrar">Enviar código</button>
  </div>
</template>

<script setup>


</script>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');


.confirmCode-modal {
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

.confirmCode h2 {
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
    background-color: #4E4794;
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
</style>