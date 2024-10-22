<script>
import { store } from '../store/store.js';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';


export default {
  name: 'Search',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      filterRadius: 20,
      apartments: [],
      rooms: 1,
      beds: 1,
      services: [],   
      selectedServices: [], // Servizi selezionati dall'utente
      isModalOpen: false,   // Stato del modal (aperto/chiuso)
    };
  },
  computed: {
    searchQuery() {
      
      return this.$route.query || "";
    },
  },
  methods: {
    fetchSearchResults() {      
      // Effettua la chiamata API con il parametro di ricerca
      axios.get(store.apiUrl + 'apartments/search', {
          params: {
            lat: this.searchQuery.lat,
            lng: this.searchQuery.lng,
            radius: this.filterRadius || 20,
            rooms: this.rooms || 1,
            beds: this.beds || 1,
            services: this.selectedServices || []
          },
        })
        .then((res) => {
          this.apartments = res.data.apartments; 
          console.log(res.data.apartments);
        })
        .catch((error) => {
          console.log(error.message);
        })
    },
    getServices(){
      axios.get(store.apiUrl + 'services')
        .then(res => {
          this.services = res.data.services;
        })
        .catch(error => {
          console.log(error.message);
        })
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
      console.log(this.selectedServices);
    },
    // applyFilters() {
    //   this.toggleModal(); 
    // }
  },
  mounted() {
    this.getServices();
    this.fetchSearchResults();
  },
  watch: {
    // Ricarica i risultati quando cambia la query di ricerca
    searchQuery() {
      // Chiama la funzione di ricerca solo se la query ha più di 2 caratteri
      if (this.searchQuery.q.length > 2) {
          this.fetchSearchResults();
      } else {
          this.apartments = []; // Resetta gli appartamenti se la query è troppo corta
      }
    }
  },
};
</script>

<template>
    <div class="container m-auto mt-10 mb-10">

        <div class="filters w-fit mx-auto p-8 bg-grey-100 border-2 border-bg-gray-100 bg-white shadow-lg rounded-3xl">
          <form @submit.prevent="fetchSearchResults" class="grid grid-cols-5">

              <!-- selezione raggio -->
              <div>
                <div class="mb-3 font-bold text-center">
                  <label for="radius">Distanza(km)</label>
                </div>
                <div class="text-center">
                  <input class="w-1/3 rounded-lg focus:ring-2 focus:ring-inset focus:ring-accent border-none bg-gray-200" name="radius" id="radius" type="number" value="20" v-model="filterRadius">
                </div>
              </div>

              <!-- selezione numero di stanze -->
              <div>
                <div class="mb-3 font-bold text-center">
                  <label for="rooms">Stanze:</label>
                </div>
                <div class="text-center">
                  <input class="w-1/3 rounded-lg focus:ring-2 focus:ring-inset focus:ring-accent border-none bg-gray-200" name="rooms" id="rooms" type="number" value="1" v-model="rooms">
                </div>
              </div>

              <!-- selezione numero di letti -->
              <div>
                <div class="mb-3 font-bold text-center">
                  <label for="beds">Posti Letto:</label>
                </div>
                <div class="text-center">
                  <input class="w-1/3 rounded-lg focus:ring-2 focus:ring-inset focus:ring-accent border-none bg-gray-200" name="beds" id="beds" type="number" value="1" v-model="beds">
                </div>
              </div>

              <!-- bottone menù servizi -->
              <div class="text-center">
                <button class="btn bg-accent text-neutral font-bold w-fit h-fit p-2 ps-6 pe-6 rounded-lg mt-5 hover:bg-lime-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition hover:bg-lime-600 duration-300" @click="toggleModal">Servizi</button>
              </div>

              <!-- invio -->
              <button class="auto-rows-max bg-secondary text-neutral font-bold w-fit h-fit p-2 ps-6 pe-6 rounded-lg mt-5 hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2         focus-visible:outline-secondary transition bg-blue-500 hover:bg-indigo-500 duration-300" type="submit">Filtra</button>
          </form>
        </div>

        <h1 class="mt-8">Risultati della ricerca per: "{{ searchQuery.q }}"</h1>

        <!-- Modal per la selezione dei servizi -->
        <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-primary bg-opacity-50">
          <div class="bg-white p-8 rounded-lg w-fit">
            <h2 class="text-xl mb-4">Seleziona i servizi</h2>

            <div class="flex flex-col flex-wrap h-fit max-h-96 w-fit w-full">
              
              <!-- Lista servizi -->
              <div v-for="service in services" :key="service.id" class="flex items-center m-2">
                <input type="checkbox" class="filter-checkbox rounded-sm checked:bg-accent outline-accent focus:outline-accent" :id="service.id" v-model="selectedServices" :value="service.id">
                <label :for="service.id" class="ml-2">{{ service.name }}</label>
              </div>

            </div>

            <!-- Bottoni per chiudere il modal -->
            <div class="mt-4 flex justify-center space-x-2 mt-6">
              <button @click="toggleModal" class="btn bg-blue-500 text-white px-4 py-2 rounded bg-accent">Applica</button>
              <button @click="toggleModal" class="btn bg-gray-300 px-4 py-2 rounded bg-background">Chiudi</button>
            </div>

          </div>
        </div>


        <div class="grid grid-cols-4">

          <div v-for="apartment in apartments" :key="apartment.id">
            <router-link :to="{name:'details', params:{slug: apartment.slug}}" class="card gap-1 mt-5 flex flex-col justify-center items-center text-center relative">
              <img 
                :src="apartment.image_path" 
                :alt="apartment.title" 
                class="w-full h-full rounded object-cover"
              >
              <!-- Dettagli dell'appartamento -->
              <h3 class="text-center mt-2">{{ apartment.title }}</h3>
            </router-link>
          </div>

        </div>

    </div>
</template>

<style scoped lang="scss">

.card{
  width: 305px;
  margin-right: 20px;
  aspect-ratio: 1/1
}

[type='checkbox']{
  color: #556B2F;
}
</style>