<script>
import Logo from './Logo.vue';
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


export default {
  name: 'Footer',
  components: {
   
  },
  
};
</script>

<template>
    <div class=" flex boolbnb-bg-black text-white fixed w-full z-10 bottom-0 left-0 h-10 justify-between">

      <div class="hidden md:flex space-x-4 pl-4">
        
        <a href="#">© 2024 BoolBnB, Inc.</a>
        <a href="#">-</a>
        <a href="#">Privacy</a>
        <a href="#">-</a>
        <a href="#">Contattaci</a>
        <a href="#">-</a>
        <a href="#">Tutti i diritti riservati </a>
      </div>

      <div class="flex hidden md:flex space-x-4 pr-4">
        <a href="#">Italiano (IT)</a>
        <a href="#">-</a>
        <a href="#">€ EUR</a>
        <a href="#">-</a>
        
        <font-awesome-icon icon="fa-brands fa-instagram" class="h-4 w-4"/>
        
      </div>

      
    </div>
  </template>
  

  
  <style scoped lang="scss">
  .boolbnb-bg-black{
    background-color:rgb(28, 28, 28)
  }
  font-awesome-icon{
    color: white;
    
  }
  </style>
  