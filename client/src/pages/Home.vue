<template >
    <div class="dashboard-page">
      <dashboard-modal class="dashboard-modal"/>
    </div>
  </template>
  
  <script>
  import dashboardModal from '@/components/dashboardModal.vue'
  
  export default {
    name: 'homePage',
    components: {
        dashboardModal
    }
  }
  </script>

  <style>
    html, body, #app {
        margin: 0;
        padding: 0;
        height: 100%;
    }

    .dashboard-page {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #9188C2;
        margin-bottom: 100px;
        width: 100%;
        height: 100%;
    }

</style>