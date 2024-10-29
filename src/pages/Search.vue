<script>
import { store } from '../store/store.js';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import Card from '@/components/Card.vue';

export default {
  name: 'Search',
  components: {
    Swiper,
    SwiperSlide,
    Card
  },
  data() {
    return {
      store,
      radius: store.radius,
      apartments: [],
      rooms: store.rooms,
      beds: store.beds,
      services: store.services,   
      selectedServices: [], // Servizi selezionati dall'utente
      isModalOpen: false,   // Stato del modal (aperto/chiuso)
      isLoading: false,
      count: 0
    };
  },
  computed: {
    searchQuery() {
      return this.$route.query || "";
    },
  },
  methods: {
    updateQueryParams() {
      // Aggiorna l'URL con i parametri correnti
      this.$router.replace({
          name: "search",
          query: {
              q: store.searchQuery,
              lat: store.lat,
              lng: store.lng,
              radius: store.radius,
              rooms: store.rooms,
              beds: store.beds,
              services: this.selectedServices
        }
      });
    },
    fetchSearchResults() {  
      this.isLoading = true; 
      // Effettua la chiamata API con il parametro di ricerca
      axios.get(store.apiUrl + 'apartments/search', {
          params: {
            lat: this.searchQuery.lat,
            lng: this.searchQuery.lng,
            radius: store.radius || 20,
            rooms: store.rooms || 1,
            beds: store.beds || 1,
            services: this.selectedServices || []
          },
        })
        .then((res) => {
          this.updateQueryParams();
          this.apartments = res.data.apartments; 
          this.count = res.data.count;
          this.isLoading = false;
          console.log('servizi: ' + this.selectedServices);
          
        })
        .catch((error) => {
          console.log(error.message);
          this.isLoading = false;
        })
    },
    getServices(){
      axios.get(store.apiUrl + 'services')
        .then(res => {
          store.services = res.data.services;
        })
        .catch(error => {
          console.log(error.message);
        })
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
      // console.log(this.selectedServices);
    },
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
  <div class="mt-20 mb-20 pt-16 container mx-auto p-8">

      <div class="filters lg:w-fit w-full mx-auto p-8 bg-neutral border-2 border-gray-100 shadow-lg rounded-3xl">
        <form @submit.prevent="fetchSearchResults" class="grid md:grid-cols-5 grid-cols-1 gap-4">

            <!-- Selezione raggio -->
            <div>
              <div class="mb-3 font-bold text-center">
                <label for="radius">Distanza(km)</label>
              </div>
              <div class="text-center">
                <input class="md:w-2/5 w-full rounded-lg focus:ring-2 focus:ring-inset focus:ring-accent border-none bg-gray-200 text-center" name="radius" id="radius" type="number" v-model="store.radius" min="0" @input="fetchSearchResults">
              </div>
            </div>

            <!-- Selezione numero di stanze -->
            <div>
              <div class="mb-3 font-bold text-center">
                <label for="rooms">Stanze:</label>
              </div>
              <div class="text-center">
                <input class="md:w-2/5 w-full rounded-lg focus:ring-2 focus:ring-inset focus:ring-accent border-none bg-gray-200 text-center" name="rooms" id="rooms" type="number" v-model="store.rooms" min="1" @input="fetchSearchResults">
              </div>
            </div>

            <!-- Selezione numero di letti -->
            <div>
              <div class="mb-3 font-bold text-center">
                <label for="beds">Posti Letto:</label>
              </div>
              <div class="text-center">
                <input class="md:w-2/5 w-full rounded-lg focus:ring-2 focus:ring-inset focus:ring-accent border-none bg-gray-200 text-center" name="beds" id="beds" type="number" v-model="store.beds" min="1" @input="fetchSearchResults">
              </div>
            </div>

            <!-- Bottone menù servizi -->
            <div class="text-center">
              <button class="btn bg-accent text-neutral font-bold w-fit h-fit p-2 ps-6 pe-6 rounded-lg mt-5 hover:bg-lime-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition duration-300" @click="toggleModal">
                {{ this.selectedServices.length > 0 ? 'Servizi (' + this.selectedServices.length + ')' : 'Servizi' }}
              </button>
            </div>

            <!-- Invio -->
            <button class="auto-rows-max bg-secondary text-neutral font-bold w-fit h-fit p-2 ps-6 pe-6 rounded-lg mt-5 hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition duration-300 mx-auto" type="submit">
              {{ this.isLoading ? 'In corso...' : 'Filtra' }}
            </button>
        </form>
      </div>

      <!-- Modal per la selezione dei servizi -->
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-primary bg-opacity-50">
        <div class="bg-neutral p-8 rounded-lg w-5/6 xl:w-fit">
          <h2 class="text-xl mb-4 font-bold">Seleziona i servizi</h2>

          <div class="flex flex-col lg:flex-wrap h-fit max-h-96 lg:overflow-hidden overflow-auto">
            
            <!-- Lista servizi -->
            <div v-for="service in store.services" :key="service.id" class="flex items-center m-2">
              <input type="checkbox" class="filter-checkbox rounded-sm checked:bg-accent outline-accent focus:outline-accent" :id="service.id" v-model="this.selectedServices" :value="service.id" @change="fetchSearchResults">
              <label :for="service.id" class="ml-2">{{ service.name }}</label>
            </div>

          </div>

          <!-- Bottoni per chiudere il modal -->
          <div class="mt-4 flex justify-center space-x-2">
            <button @click="toggleModal" class="btn text-white px-4 py-2 rounded bg-accent font-bold">Applica</button>
            <button @click="toggleModal" class="btn bg-gray-300 px-4 py-2 rounded font-bold">Chiudi</button>
          </div>

        </div>
      </div>

      <h3 class="mt-6">Appartamenti Disponibili: <strong>{{ this.count }}</strong></h3>

      <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 pb-20 gap-4">
        <Card 
          v-for="apartment in apartments" 
          :key="apartment.id" 
          :apartment="apartment" 
        />
      </div>

  </div>
</template>


<style scoped lang="scss">

.card{
  width: calc(100%);
  aspect-ratio: 1/1;

  .ribbon {
      position: absolute;
      top: 10px;
      left: 10px;
      background-color: #fff;
      opacity: 0.8;
      color: #000;
      padding: 5px 15px;
      font-size: 0.8rem;
      font-weight: bold;
      z-index: 1;
      width: 120px; 
      text-align: center;
      border-radius: 10px; 
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1); 
    }
}

[type='checkbox']{
  color: #556B2F;
}
</style>

