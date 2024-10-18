<script>
  import Footer from './components/partials/Footer.vue';
  import Navbar from './components/partials/Navbar.vue';

  export default {
    components:{
      Navbar,
      Footer
    }
  }
</script>

<template>
  <div>
    <Navbar />
    <div class="pt-16 mx-4"> <!-- Aggiungi padding-top per la navbar -->
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
</style>