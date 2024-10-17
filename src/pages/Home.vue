<script>
    // import Cards from '../components/partials/Cards.vue';
    // import Detail from '../components/partials/Detail.vue';

    import axios from 'axios';
    import { store } from '../store/store.js';

    export default {
        name: 'home',
        data() {
          return {
            store,
            apartments: []            
          }
        },
        methods: {
            getApi(){
                axios.get(store.apiUrl + 'apartments')
                    .then(res => {
                        this.apartments = res.data.apartments;
                        console.log(res.data.apartments);
                    })
            }
        },
        mounted(){
            this.getApi();
        }
    }
    
</script>

<template>
    <h1 class="p-4 bg-blue-500 text-white text-center rounded-md sm:bg-red-500 md:bg-green-500">Benvenuto nella HomePage di BoolBnb!</h1>

    <div class="container m-auto text">
        <div class="text-center w-full bg-red-500 h-10 rounded">
            QUI CI FINIRA' LA BARRA DEI FILTRI
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <!-- <div class="square bg-blue-500 rounded sm:bg-red-500 md:bg-green-500 lg:bg-blue-300" ></div> -->
            
            <div v-for="apartment in apartments" :key="apartment.id" class="square">
              <img :src="apartment.image_path" :alt="apartment.title" class="w-fill h-full rounded object-cover">
            </div>
            
            
            
            
        </div>

        
        
    </div>
    
</template>

<style scoped lang="scss">
.container {
  margin-top: 5%;
  margin-bottom: 5%;

  .square {
    aspect-ratio: 1 / 1; // Mantiene i quadrati proporzionati
    margin: 20px;
  }
}
</style>
