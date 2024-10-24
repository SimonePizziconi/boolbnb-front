<script>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


export default {
  name: 'Footer',
  components: {
   
  },
  
};
</script>

<template>
  <div class="bg-primary text-neutral w-full z-10 bottom-0 left-0 p-4 md:flex md:fixed md:bottom-0 md:justify-between">

    <ul class="flex flex-col md:flex-row h-full space-x-0 md:space-x-4 md:space-y-0 space-y-2 items-center">
      <li>
        <a class="text-center" href="#">© 2024 BoolBnB, Inc.</a>
      </li>
      <li>
        <a class="text-center" href="#">Privacy</a>
      </li>
      <li>
        <a class="text-center" href="#">Contattaci</a>
      </li>
      <li>
        <a class="text-center" href="#">Tutti i diritti riservati</a>
      </li>
    </ul>

    <!-- Questo div sarà invisibile sui dispositivi mobili -->
    <div class="hidden md:flex md:flex-row space-x-4 pr-4 mt-4 md:mt-0">
      <a href="#">Italiano (IT)</a>
      <span>-</span>
      <a href="#">€ EUR</a>
      <span>-</span>
      <a href="#"><i class="fa-brands fa-instagram pt-1"></i></a>
      <a href="#"><i class="fa-brands fa-facebook pt-1"></i></a>
      <a href="#"><i class="fa-brands fa-twitter pt-1"></i></a>
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
  