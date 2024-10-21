<script>
    import axios from 'axios';
    import { store } from '../store/store.js';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/swiper-bundle.css';
    import 'swiper/css';
    import { Autoplay, Navigation, Pagination } from 'swiper/modules';
    import Loader from '@/components/Loader.vue';

    export default {
        name: 'home',
        components: {
          Swiper,
          SwiperSlide,
          Loader,
        },
        data() {
          return {
            store,
            apartments: [],
            visibleApartments: [],
            apartmentsPerLoad: 10,
            loading:true,
          };
        },
        methods: {
            getApi() {
                axios.get(store.apiUrl + 'apartments')
                    .then(res => {
                        this.apartments = res.data.apartments;
                        this.visibleApartments = this.apartments.slice(0, this.apartmentsPerLoad);
                        console.log(res.data.apartments);
                        this.loading = false;
                    })
                    .catch(error => {
                        console.error("Errore nel caricamento degli appartamenti: ", error);
                    });
            },
            loadMore() {
                // Aggiunge altre 4 card all'array visibile
                const currentLength = this.visibleApartments.length;
                const moreApartments = this.apartments.slice(currentLength, currentLength + this.apartmentsPerLoad);
                this.visibleApartments.push(...moreApartments);
            }
        },
        mounted() {
            this.getApi();
            this.visibleApartments = this.apartments.slice(0, this.apartmentsPerLoad);
        },
        setup(){
            return{
              modules : [Autoplay]
          }
        },
    };
</script>

<template>
  <div class="loader-container" v-if="this.loading">
    <Loader></Loader>
  </div>
  
  <div v-else>

    <div class="container m-auto text">
      <!-- Swiper con 4 slide visibili per volta con loop infinito e blocco sull'hover -->
      <h1 class="text-neutral">Appartamenti in evidenza</h1>
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
          <router-link :to="{name:'details', params:{slug: apartment.slug}}" class="card gap-1 mt-5 flex flex-col justify-center items-center text-center relative">
            <div class="ribbon">Nuovo</div>
            <img 
              :src="apartment.image_path" 
              :alt="apartment.title" 
              class="w-full h-full rounded object-cover"
            >
            <!-- Dettagli dell'appartamento -->
            <h3 class="text-center mt-2 text-neutral">{{ apartment.title }}</h3>
          </router-link>
        </swiper-slide>
      </swiper>

      <!-- Swiper con 4 slide visibili per volta e navigazione con loop infinito e blocco sull'hover -->
      <h1 class="text-neutral">Appartamenti non in evidenza</h1>
      <div class="card-container flex flex-wrap justify-between">
        <div v-for="apartment in visibleApartments" :key="apartment.id" class="card">
          <router-link :to="{name:'details', params:{slug: apartment.slug}}" class="w-full rounded object-cover">
            <img 
              :src="apartment.image_path" 
              :alt="apartment.title" 
              class="w-full h-full rounded object-cover"
            >
            <h3 class="text-center text-neutral">{{ apartment.title }}</h3>
          </router-link>
        </div>
        <div class="flex w-full justify-center mt-10">
          <div>
            <!-- Mostra il bottone per caricare più appartamenti -->
            <svg v-if="visibleApartments.length < apartments.length" @click="loadMore" class="animate-bounce h-10 bg-primary rounded-full text-white cursor-pointer w-20">
              <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="white" font-size="12">Carica di più</text>
            </svg>
            <!-- Messaggio quando non ci sono più appartamenti -->
            <p v-else class="text-center mt-2">Non ci sono più appartamenti da caricare.</p>
          </div>
        </div>
      </div>
    </div>
  </div>


  
</template>

<style scoped lang="scss">

 .loader-container{
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

.container {
  margin-top: 5%;
  margin-bottom: 5%;

  .card {
    aspect-ratio: 1 / 1;

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

.card-container{
  gap: 30px;

  .card{
    width: calc(100% / 5 - 30px);
    margin-top: 40px;
  }
}
}
</style>
