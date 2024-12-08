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
      isModalOpen: false,
    }
  },
  methods: {
    getUser(){
        axios.get(store.apiUrl + 'user', { withCredentials: true })
            .then(res => {
              this.user = res.data.user;
              // console.log(this.user);
            })
            .catch(error => {
                console.log(error.message);
            })
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleSearchModal() {
      this.isModalOpen = !this.isModalOpen;
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
      <div class="w-14 mr-4 md:hidden">
        <router-link to="/"><img src="../../../public/img/small-logo.png" alt="Logo"></router-link>
      </div>
      <div class="w-14 hidden md:block">
        <router-link to="/"><img src="../../../public/img/logo-bool-bnb.png" alt="Logo"></router-link>
      </div>

      <!-- SearchBar -->
      <SearchBar class="hidden sm:block"/>

      <button @click="toggleSearchModal" class="sm:hidden bg-accent text-white px-4 py-2 rounded-lg">
        Dove vuoi andare?
      </button>

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
        <div class="relative inline-block text-left ml-4">
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
          </div>
        </transition>
        <transition name="fade">
            <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
              <div class="bg-neutral w-full max-w-md pt-8 pb-8 pl-2 pr-2 mr-2 ml-2 rounded-lg relative">
                <button @click="toggleSearchModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <SearchBar @searchCompleted="toggleSearchModal" />
              </div>
            </div>
        </transition>
        </div>

      </div>

    </div>
    <div v-if="menuOpen" class="absolute right-0 -bottom-16 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-neutral shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div class="py-1" role="none">
        <a href="http://localhost:8000/login" class="block px-4 py-2 text-sm text-primary hover:bg-accent hover:text-neutral"  role="menuitem" tabindex="-1" id="menu-item-6">
          <span>Accedi</span>
        </a>
        <a href="http://localhost:8000/register" class="block px-4 py-2 text-sm text-primary hover:bg-accent hover:text-neutral"  role="menuitem" tabindex="-1" id="menu-item-6">
          <span>Registrati</span>
        </a>
      </div>
    </div>
  </nav>
</template>
  

  
  <style scoped lang="scss">
  </style>
  