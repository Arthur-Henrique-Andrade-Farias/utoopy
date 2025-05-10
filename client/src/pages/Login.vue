<template >
    <div class="login-page">
      <login-modal class="login-modal"/>
    </div>
  </template>
  
  <script>
  import loginModal from '@/components/loginModal.vue'
  
  export default {
    name: 'LoginPage',
    components: {
      loginModal
    }
  }
  </script>

  <style>
    html, body, #app {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    .login-page {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9188C2;
      width: 100%;
      height: 100%;
    }

    .login-modal {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
</style>