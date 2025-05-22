<template >
    <div class="confirmCode-page">
      <confirmCode-modal class="confirmCode-modal"/>
    </div>
  </template>
  
  <script>
  import confirmCodeModal from '@/components/confirmCodeModal.vue'
  
  export default {
    name: 'confirmCode',
    components: {
        confirmCodeModal
    }
  }
  </script>

  <style>
    html, body, #app {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    .confirmCode-page {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #88c28d;
      margin-bottom: 100px;
      width: 100%;
      height: 100%;
    }

    .confirmCode-modal {
      height: 70%;
      width: 200px;
      display: auto;
    }


</style>