<script>
import Logo from './Logo.vue';
import SearchBar from './SearchBar.vue';
import { ref } from 'vue';

export default {
  name: 'Navbar',
  components: {
    Logo,
    SearchBar
  },
  setup() {
    const menuOpen = ref(false);
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };
    return { menuOpen, toggleMenu };
  },
};
</script>

<template>
    <nav class="bg-gray-800 text-white fixed w-full z-10 top-0 left-0">
      <div class="container mx-auto px-4 py-2 flex justify-between items-center">
        <!-- Logo -->
        <Logo />

        <!-- SearchBar -->
        <SearchBar />

        <!-- Link -->
        <div class="hidden md:flex space-x-4">
          <a href="http://127.0.0.1:8000/login">Login</a>
          <a href="http://127.0.0.1:8000/register">Registrati</a>
        </div>
        <div class="md:hidden">
          <button @click="toggleMenu" class="focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      <div v-if="menuOpen" class="md:hidden">
        <!-- <RouterLink to="/" class="block hover:bg-gray-700 px-3 py-2">Home</RouterLink> -->
        <RouterLink to="/portfolio" class="block hover:bg-gray-700 px-3 py-2">Login</RouterLink>
        <RouterLink to="/about" class="block hover:bg-gray-700 px-3 py-2">Register</RouterLink>
        <!-- <RouterLink to="/contacts" class="block hover:bg-gray-700 px-3 py-2">Contacts</RouterLink> -->
      </div>
    </nav>
  </template>
  

  
  <style scoped lang="scss">
  

  </style>
  