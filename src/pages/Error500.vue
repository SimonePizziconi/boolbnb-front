<template>
    <div class="h-screen flex flex-col items-center justify-center overflow-hidden">
      <h1 class="text-6xl font-bold text-accent">500</h1>
      <p class="text-2xl mt-4 text-primary">Errore interno del server</p>
      <p class="text-lg text-primary mt-2">Qualcosa è andato storto. Riprova più tardi.</p>
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
    name: 'Error500',
    methods: {
    async fetchData() {
    try {
      const response = await axios.get('/api/some-endpoint');
    } catch (error) {
      console.error('Server Error:', error);
      this.$router.push({ name: 'Error500' });
    }
  }
}

  };
  </script>
  
  <style lang="scss" scoped>
  
  </style>
  