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
      apartments: [],   
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
      axios.get('http://localhost:8000/api/apartments/search', {
          params: {
            lat: this.searchQuery.lat,
            lng: this.searchQuery.lng,
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
  },
  mounted() {
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