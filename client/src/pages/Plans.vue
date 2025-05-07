<template >
    <div class="plans-page">
      <plans-modal class="plans-modal"/>
    </div>
  </template>
  
  <script>
  import plansModal from '@/components/plansModal.vue'
  
  export default {
    name: 'plansPage',
    components: {
      plansModal
    }
  }
  </script>

  <style>
    html, body, #app {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    .plans-page {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9188C2;
      margin-bottom: 100px;
      width: 100%;
      height: 100%;
    }
    .plans-modal {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin-bottom: 100px;
    }
</style>