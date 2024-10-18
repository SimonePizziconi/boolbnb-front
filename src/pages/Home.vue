<script>
    import axios from 'axios';
    import { store } from '../store/store.js';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/swiper-bundle.css';
    import 'swiper/css';
    import { Autoplay, Navigation, Pagination } from 'swiper/modules';

    export default {
        name: 'home',
        components: {
          Swiper,
          SwiperSlide,
        },
        data() {
          return {
            store,
            apartments: [] 
          };
        },
        methods: {
            getApi() {
                axios.get(store.apiUrl + 'apartments')
                    .then(res => {
                        this.apartments = res.data.apartments;
                        console.log(res.data.apartments);
                    })
                    .catch(error => {
                        console.error("Errore nel caricamento degli appartamenti: ", error);
                    });
            }
        },
        mounted() {
            this.getApi();
        },
        setup(){
            return{
              modules : [Autoplay]
          }
        },
    };
</script>

<template>
  <h1 class="p-4 text-secondary text-center">
    Benvenuto nella HomePage di BoolBnb!
  </h1>

  <div class="container m-auto text">
    <!-- Swiper con 4 slide visibili per volta con loop infinito e blocco sull'hover -->
    <h1 class="text-secondary">Appartamenti in evidenza</h1>
    <swiper :autoplay="{delay : 5000, disableOnInteraction : false, pauseOnMouseEnter: true}" 
      :modules="modules" 
      :slides-per-view="4" space-between="20" loop="true"  
      :breakpoints="{
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 }
      }" class="my-swiper">
      <!-- Cicliamo gli appartamenti per ogni slide -->
      <swiper-slide v-for="apartment in apartments" :key="apartment.id">
        <a href="#" class="card">
          <div class="ribbon">Nuovo</div>
          <img 
            :src="apartment.image_path" 
            :alt="apartment.title" 
            class="w-full h-full rounded object-cover"
          >
          <!-- Dettagli dell'appartamento -->
          <h3 class="text-center mt-2">{{ apartment.title }}</h3>
        </a>
      </swiper-slide>
    </swiper>

    <!-- Swiper con 4 slide visibili per volta e navigazione con loop infinito e blocco sull'hover -->
    <h1>Appartamenti non in evidenza</h1>
    <swiper :autoplay="{delay : 5000, disableOnInteraction : false, pauseOnMouseEnter: true}" 
      :modules="modules" 
      :slides-per-view="4" space-between="20" loop="true" 
      :breakpoints="{
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 }
      }" class="my-swiper">
      <!-- Cicliamo gli appartamenti per ogni slide -->
      <swiper-slide v-for="apartment in apartments" :key="apartment.id">
        <a href="#" class="card">
          <img 
            :src="apartment.image_path" 
            :alt="apartment.title" 
            class="w-full h-full rounded object-cover"
          >
          <!-- Dettagli dell'appartamento -->
          <h3 class="text-center mt-2">{{ apartment.title }}</h3>
        </a>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped lang="scss">

.container {
  margin-top: 5%;
  margin-bottom: 5%;

  .card {
    aspect-ratio: 1 / 1;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative; 

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }

    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-top: 10px;
    }

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
      width: 100px; 
      text-align: center;
      border-radius: 10px; 
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1); 
    }
  }
}
</style>
