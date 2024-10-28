<script>
import { store } from '@/store/store';
import axios from 'axios';
import SearchBar from './SearchBar.vue';
import { ref } from 'vue';

export default {
  name: 'Navbar',
  components: {
    SearchBar
  },
  data(){
    return {
      store,
      user: {},
      isDropdownOpen: false,
    }
  },
  methods: {
    getUser(){
        axios.get(store.apiUrl + 'user', { withCredentials: true })
            .then(res => {
              this.user = res.data.user;
              console.log(this.user);
            })
            .catch(error => {
                console.log(error.message);
            })
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
  setup() {
    const menuOpen = ref(false);
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };
    return { menuOpen, toggleMenu };
  },
  mounted(){
    this.getUser();
  }
};
</script>

<template>
  <nav class="text-white fixed w-full z-10 top-0 left-0 flex bg-primary p-2">
    <div class="container mx-auto px-4 py-2 flex justify-between items-center">
      <!-- Logo -->
      <div class="w-14">
        <router-link to="/"><img src="../../../public/img/logo-bool-bnb.png" alt="Logo"></router-link>
      </div>

      <!-- SearchBar -->
      <SearchBar />

      <!-- Link -->
      <div v-if="!this.user">
        <div class="hidden md:flex space-x-4">
          <a class="hover:text-accent" href="http://localhost:8000/login">Accedi</a>
          <a class="hover:text-accent" href="http://localhost:8000/register">Registrati</a>
        </div>
        <div class="md:hidden">
          <button @click="toggleMenu" class="focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- User -->
      <div v-else>
        <div class="relative inline-block text-left">
          <div>
            <button type="button" id="menu-button" aria-expanded="true" aria-haspopup="true" @click="toggleDropdown">
              <div class="flex flex-col justify-center items-center text-neutral hover:text-accent pl-1">
                <div class="p-5 aspect-square bg-accent hover:bg-neutral rounded-full relative">
                  <i class="fa-solid fa-user absolute top-1/2 left-1/2" style="transform:translate(-50%, -50%)"></i>
                </div>
                <small class="mt-1 hidden md:inline"> {{ this.user.first_name }} {{ this.user.last_name }}</small>
              </div>
            </button>
          </div>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
          <div v-if="isDropdownOpen" class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-neutral shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1" role="none">
              <strong class="block px-4 py-2 text-sm text-primary hover:bg-accent hover:text-neutral transition duration-150"  role="menuitem" tabindex="-1">{{ this.user.email }}</strong>
              <a href="http://localhost:8000/admin/" class="block px-4 py-2 text-sm text-primary hover:bg-accent hover:text-neutral"  role="menuitem" tabindex="-1" id="menu-item-6">
                <span>Area Personale</span>
              </a>
            </div>
            <div class="py-1" role="none">
              <a href="http://localhost:8000/admin/apartments" class="block px-4 py-2 text-sm text-primary hover:bg-accent hover:text-neutral transition duration-150"  role="menuitem" tabindex="-1" id="menu-item-1">
                <span>I Miei Appartamenti</span>
              </a>
              <a href="http://localhost:8000/admin/apartments/create" class="block px-4 py-2 text-sm text-primary hover:bg-accent hover:text-neutral transition duration-150"  role="menuitem" tabindex="-1" id="menu-item-2">
                <span>Nuovo Appartamento</span>
              </a>
            </div>
            <div class="py-1" role="none">
              <a href="http://localhost:8000/admin/sponsorships/payment" class="block px-4 py-2 text-sm text-primary hover:bg-accent hover:text-neutral transition duration-150"  role="menuitem" tabindex="-1" id="menu-item-3">
                <span>Sponsorizzazioni</span>
              </a>
              <a href="http://localhost:8000/admin/messagges" class="block px-4 py-2 text-sm text-primary hover:bg-accent hover:text-neutral transition duration-150"  role="menuitem" tabindex="-1" id="menu-item-4">
                <span>Messaggi</span>
              </a>
            </div>
            <div class="py-1" role="none">
              <a href="#" class="block px-4 py-2 text-sm text-primary hover:bg-accent hover:text-neutral"  role="menuitem" tabindex="-1" id="menu-item-6">
                <span>Logout</span>
              </a>
            </div>
          </div>
        </transition>
        </div>

      </div>

    </div>
    <div v-if="menuOpen" class="md:hidden flex flex-col m-1">
      <!-- <RouterLink to="/" class="block hover:bg-gray-700 px-3 py-2">Home</RouterLink> -->
      <a href="http://127.0.0.1:8000/login">Login</a>
      <a href="http://127.0.0.1:8000/register">Registrati</a>
      <!-- <RouterLink to="/contacts" class="block hover:bg-gray-700 px-3 py-2">Contacts</RouterLink> -->
    </div>
  </nav>
</template>
  

  
  <style scoped lang="scss">
  </style>
  