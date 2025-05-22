<template >
    <div class="register-page">
      <register-modal class="register-modal"/>
    </div>
  </template>
  
  <script>
  import registerModal from '@/components/registerModal.vue'
  
  export default {
    name: 'RegisterPage',
    components: {
        registerModal
    }
  }
  </script>

  <style>
    html, body, #app {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    .register-page {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #88c28d;
      margin-bottom: 100px;
      width: 100%;
      height: 100%;
    }

    .register-modal {
      height: 70%;
      width: 200px;
      display: auto;
    }


</style>