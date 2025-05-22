<template >
    <div class="forgotPass-page">
      <forgotPass-modal class="forgotPass-modal"/>
    </div>
  </template>
  
  <script>
  import forgotPassModal from '@/components/forgotPassModal.vue'
  
  export default {
    name: 'ForgotPassPage',
    components: {
        forgotPassModal
    }
  }
  </script>

  <style>
    html, body, #app {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    .forgotPass-page {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #88c28d;
      margin-bottom: 100px;
      width: 100%;
      height: 100%;
    }

    .forgotPass-modal {
      height: 70%;
      width: 200px;
      display: auto;
    }


</style>