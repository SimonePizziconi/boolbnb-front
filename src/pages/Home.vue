<script>
  import axios from 'axios';
  import { store } from '../store/store.js';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/swiper-bundle.css';
  import 'swiper/css';
  import { Autoplay, Navigation, Pagination } from 'swiper/modules';
  import Loader from '@/components/Loader.vue';
  import Card from '@/components/Card.vue';

  export default {
      name: 'home',
      components: {
        Swiper,
        SwiperSlide,
        Loader,
        Card,
      },
      data() {
        return {
          store,
          apartments: [],
          sponsorshipApartments: [],
          nonSponsorshipApartments: [],
          visibleNonSponsorshipApartments: [],
          apartmentsPerLoad: 8,
          loading:true,
        };
      },
      methods: {
          getApi() {
              axios.get(store.apiUrl + 'apartments')
                  .then(res => {
                      this.apartments = res.data.apartments;
                    
                      this.nonSponsorshipApartments = this.apartments.filter(apartment => {
                      return apartment.sponsorships.length === 0;
                      });

                      this.sponsorshipApartments = this.apartments.filter(apartment => {
                        return apartment.sponsorships.length > 0;
                      });
                      
                      this.visibleNonSponsorshipApartments = this.nonSponsorshipApartments.slice(0, this.apartmentsPerLoad);
                      this.loading = false;
                  })
                  .catch(error => {
                      console.error("Errore nel caricamento degli appartamenti: ", error);
                  });
          },
          loadMoreNonSponsorship() {
            const currentLength = this.visibleNonSponsorshipApartments.length;
            const moreApartments = this.nonSponsorshipApartments.slice(currentLength, currentLength + this.apartmentsPerLoad);
            this.visibleNonSponsorshipApartments.push(...moreApartments);
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
  <div class="container mx-auto">

    <div class="loader-container" v-if="this.loading">
      <Loader></Loader>
    </div>
  
    <div v-else>

      <div class="mt-20 mb-20 mx-5 lg:mx-20 pt-16">
        <!-- Sezione Appartamenti in evidenza -->
        <h1 class="text-primary text-xl lg:text-2xl font-bold">Appartamenti in evidenza</h1>
        <swiper 
          :autoplay="{delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true}" 
          :modules="modules" 
          :slides-per-view="4" 
          space-between="20" 
          loop="true"  
          :breakpoints="{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 4 }
          }" 
          class="my-swiper"
        >
          <swiper-slide v-for="apartment in sponsorshipApartments" :key="apartment.id">
            <Card class="border-2 border-secondary rounded-md" :apartment="apartment" />
          </swiper-slide>
        </swiper>

        <!-- Sezione Appartamenti senza sponsorizzazioni -->
        <h1 class="text-primary text-xl lg:text-2xl font-bold mt-10">I nostri appartamenti</h1>
        <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 w-full pb-10">
          <Card 
            v-for="apartment in visibleNonSponsorshipApartments" 
            :key="apartment.id" 
            :apartment="apartment" 
          />
        </div>
            
      <!-- Bottone per caricare gli altri appartamenti -->
      <div class="w-full flex justify-center mt-4">
        <svg 
          v-if="visibleNonSponsorshipApartments.length < nonSponsorshipApartments.length" 
          @click="loadMoreNonSponsorship" 
          class="animate-bounce h-10 bg-accent rounded-full text-white cursor-pointer w-28 pe-2 ps-2 font-bold"
        >
          <text 
            x="50%" 
            y="50%" 
            text-anchor="middle" 
            dominant-baseline="middle" 
            fill="white" 
            font-size="12"
          >
            Carica di più
          </text>
        </svg>
        <p v-else class="text-center mt-2">Non ci sono più appartamenti da caricare.</p>
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

</style>
