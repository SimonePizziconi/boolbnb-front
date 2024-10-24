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
    <router-view />
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
</style>