<script>
    import axios from 'axios';
    import { store } from '../store/store.js';
import ContactForm from '@/components/ContactForm.vue';

    export default {
        name: 'Details',

        components:{
            ContactForm
        },

        data(){
            return {
                store,
                slug: '',
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

                //console.log(this.slug);
                
            }
        },
        mounted(){
            this.slug = this.$route.params.slug
            this.getApartment();
        }
    }
</script>

<template>

    <div class="container m-auto text">

        <div class="mt-8 mb-8">
            <h1 class="mt-2x text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ apartment.title }}</h1>
        </div>

        <div class="flex-1 w-8/10 h-96 mt-3">
            <img class="rounded-md h-full w-full object-cover" :src="apartment.image_path" :alt="apartment.title">
        </div>

        <div class="grid gap-8 grid-cols-1 gap-y-6 sm:mt-10 sm:gap-y-0 lg:grid-cols-2"> 

            <div class="rounded-md h-96 mt-10 bg-gray-200 text-center"> 
                <h6>{{ apartment.title }}</h6>
                <span>{{ apartment.rooms }} Stanze - {{ apartment.beds }} Letti - {{ apartment.bathrooms }} Bagni - {{ apartment.square_meters }} M2 </span>
            </div>

            <div class="rounded-md mt-10 bg-gray-200 text-center"> 
                <ContactForm></ContactForm>
            </div>

        </div>

        <div class="rounded-md flex-1 w-2/10 h-96 mt-10 bg-gray-200 text-center mt-20"> 
            <h2>Mappa</h2>
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

