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
    <div>
        <h1>Risultati della ricerca per: "{{ searchQuery.q }}"</h1>
        <div class="filters">
          <form @submit.prevent="fetchSearchResults">
              <div>
                <label for="radius">Raggio(km):</label>
                <input name="radius" id="radius" type="number" value="20" v-model="filterRadius">
              </div>
              <div>
                <label for="rooms">Stanze:</label>
                <input name="rooms" id="rooms" type="number" value="1" v-model="rooms">
              </div>
              <div>
                <label for="beds">Posti Letto:</label>
                <input name="beds" id="beds" type="number" value="1" v-model="beds">
              </div>
              <div>
                <button @click="toggleModal" class="btn">Servizi</button>
              </div>
              <button type="submit">Invia</button>
          </form>
        </div>

        <!-- Modal per la selezione dei servizi -->
        <div v-if="isModalOpen" class="fixed max-h-fit inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
          <div class="bg-white p-8 rounded-lg max-w-lg w-full">
            <h2 class="text-xl mb-4">Seleziona i servizi</h2>

            <!-- Lista servizi -->
            <div v-for="service in services" :key="service.id" class="flex items-center mb-2">
              <input type="checkbox" class="filter-checkbox" :id="service.id" v-model="selectedServices" :value="service.id">
              <label :for="service.id" class="ml-2">{{ service.name }}</label>
            </div>

            <!-- Bottoni per chiudere il modal -->
            <div class="mt-4 flex justify-end space-x-2">
              <button @click="toggleModal" class="btn bg-blue-500 text-white px-4 py-2 rounded">Applica</button>
              <button @click="toggleModal" class="btn bg-gray-300 px-4 py-2 rounded">Chiudi</button>
            </div>
          </div>
        </div>

        <swiper :autoplay="{delay : 5000, disableOnInteraction : false, pauseOnMouseEnter: true}" 
        :modules="modules" 
        :slides-per-view="4" space-between="20" loop="false"  
        :breakpoints="{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 }
        }" class="my-swiper">
        <!-- Cicliamo gli appartamenti per ogni slide -->
        <swiper-slide v-for="apartment in apartments" :key="apartment.id">
          <router-link :to="{name:'details', params:{slug: apartment.slug}}" class="card gap-1 mt-5 flex flex-col justify-center items-center text-center relative">
            <div class="ribbon">Nuovo</div>
            <img 
              :src="apartment.image_path" 
              :alt="apartment.title" 
              class="w-full h-full rounded object-cover"
            >
            <!-- Dettagli dell'appartamento -->
            <h3 class="text-center mt-2">{{ apartment.title }}</h3>
          </router-link>
        </swiper-slide>
      </swiper>    
    </div>
</template>

<style scoped lang="scss">

</style>