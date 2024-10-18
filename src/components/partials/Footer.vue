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
    <div class=" flex boolbnb-bg-black text-white fixed w-full z-10 bottom-0 left-0 justify-between">

      <div class="flex h-100 space-x-4 pl-4 align-middle">
        
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
        <a href="#"><i class="fa-brands fa-instagram pt-1"></i></a>
        <a href="#"><i class="fa-brands fa-facebook pt-1"></i></a>
        <a href="#"><i class="fa-brands fa-x-twitter pt-1"></i></a>
      </div>

      
    </div>
  </template>
  

  
  <style scoped lang="scss">
  .boolbnb-bg-black{
    background-color:rgb(28, 28, 28);
    height: 50px;
  }
  font-awesome-icon{
    color: white;
    
  }

  .fa-brands{
    font-size: 15px;
  }
  </style>
  