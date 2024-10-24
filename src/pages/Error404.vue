<template>
  <div class="h-screen flex flex-col items-center justify-center overflow-hidden">
    <h1 class="text-6xl font-bold text-accent">404</h1>
    <p class="text-2xl mt-4 text-primary">Pagina non trovata</p>
    <p class="text-lg text-primary mt-2">La pagina che stai cercando non esiste.</p>
    <router-link 
      to="/" 
      class="mt-6 px-4 py-2 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-secondary transition duration-300"
    >
      Torna alla Home
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Error404'
};
</script>

<style lang="scss" scoped>

</style>
