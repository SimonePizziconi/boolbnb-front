<script>
import Logo from './Logo.vue';
import { ref } from 'vue';

export default {
  name: 'Footer',
  components: {
   
  },
  
};
</script>

<template>
    <div class="bg-gray-800 text-white fixed w-full z-10 bottom-0 left-0">

      <div class="hidden md:flex space-x-4">
          <a href="http://127.0.0.1:8000/login">Login</a>
          <a href="http://127.0.0.1:8000/register">Registrati</a>
      </div>

      
    </div>
  </template>
  

  
  <style scoped lang="scss">
  /* Puoi aggiungere ulteriore stile se necessario */
  </style>
  