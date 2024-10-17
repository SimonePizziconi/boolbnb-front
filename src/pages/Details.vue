<script>
    import axios from 'axios';
    import { store } from '../store/store.js';

    export default {
        name: 'Details',
        data(){
            return {
                store,
                slug: 'casa-in-montagna',
                apartment: {}
            }
        },
        methods: {
            getApartment(){
                axios.get(store.apiUrl + 'apartment/' + this.slug)
                .then(res => {
                    this.apartment = res.data.apartment;
                    console.log(this.apartment);
                })
            }
        },
        mounted(){
            this.getApartment();
        }
    }
</script>

<template>
    <div class="container m-auto text">
        <h1 class="">{{ apartment.title }}</h1> <span>&hearts;</span>
        <div class="flex">
            <div class="flex-1 w-8/10 h-96 mt-3">
                <img class="rounded-md h-full w-full object-cover" :src="apartment.image_path" :alt="apartment.title">
            </div>
            <div class="flex-1 w-2/10 h-96 mt-3 bg-gray-200 text-center"> 
                <h6>{{ apartment.title }}</h6>
                <span>{{ apartment.rooms }} Stanze - {{ apartment.beds }} Letti - {{ apartment.bathrooms }} Bagni - {{ apartment.square_meters }} M2 </span>
            </div>
        </div>
        
    </div>
    
</template>

<style scoped lang="scss">
    h1{
        display: inline;
    }

    .img-box {
    
    width: 100%;
    height: 200px;
  }
</style>

