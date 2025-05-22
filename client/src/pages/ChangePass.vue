<template >
    <div class="changePass-page">
      <changePass-modal class="changePass-modal"/>
    </div>
  </template>
  
  <script>
  import changePassModal from '@/components/changePassModal.vue'
  
  export default {
    name: 'changePass',
    components: {
        changePassModal
    }
  }
  </script>

  <style>
    html, body, #app {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    .changePass-page {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #88c28d;
      margin-bottom: 100px;
      width: 100%;
      height: 100%;
    }

    .changePass-modal {
      height: 70%;
      width: 200px;
      display: auto;
    }


</style>