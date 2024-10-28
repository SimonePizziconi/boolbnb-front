<template>
    <router-link :to="{name:'details', params:{slug: apartment.slug}}" class="card mt-5 flex flex-col justify-center items-center relative shadow-lg">
        <div v-if="apartment.sponsorships.length > 0" class="ribbon">Sponsorizzato</div>
            <div class="w-full h-full rounded-t overflow-hidden">
                <img 
                :src="apartment.image_path" 
                :alt="apartment.title" 
                class="w-full h-full rounded-t object-cover hover:scale-110 transition duration-700"
                >
            </div>
            
        <!-- Dettagli dell'appartamento -->
        <div class="w-full bg-background rounded-b ps-4 pe-4 text-center truncate">
            <h6 class="font-bold text-secondary mt-3 mb-4 sm:text-xl lg:text-lg truncate">{{ apartment.title }}</h6>
            <p v-if="apartment.distance" class="py-2">
              Distanza: {{ apartment.distance.toFixed(2) }} km
            </p>
            <span class="lg:text-sm sm:text-md pb-2 pt-2 mt-4 border-b-2 border-t-2 border-accent me-2 truncate"><i class="fa-solid fa-location-dot me-2 text-accent"></i>{{ apartment.address }}</span>
            <span class="lg:text-sm sm:text-md pb-2 pt-2 mt-2 mb-2 block truncate"><i class="fa-solid fa-house-chimney text-secondary"></i> Stanze - {{ apartment.rooms }}  <i class="fa-solid fa-bed ms-3 text-secondary"></i> Posti letto - {{ apartment.beds }}</span>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: 'Card',
        props: {
            apartment: {
                type: Object,
                required: true
            }
        }
    };
</script>

<style lang="scss" scoped>
.card{
  width: calc(100%);
  aspect-ratio: 1/1;

  .ribbon {
      position: absolute;
      top: 10px;
      left: 10px;
      background-color: #006D77;
      opacity: 0.9;
      color: #F0F0F0;
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
</style>