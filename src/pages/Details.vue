<script>
    import axios from 'axios';
    import { store } from '../store/store.js';
    import ContactForm from '@/components/ContactForm.vue';
    import Loader from '@/components/Loader.vue';

    export default {
        name: 'Details',

        components:{
            ContactForm,
            Loader,
        },

        data(){
            return {
                store,
                slug: '',
                apartment: {},
                loading:true
            }
        },
        methods: {
            getApartment(){
                axios.get(store.apiUrl + 'apartment/' + this.slug)
                .then(res => {
                    this.apartment = res.data.apartment;
                    console.log(this.apartment);
                    this.loading = false;
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

    <div class="loader-container" v-if="this.loading">
        <Loader></Loader>
    </div>

    <div class="container m-auto text" v-else>

        <div class="mt-8 mb-8">
            <h1 class="mt-2x text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ apartment.title }}</h1>
        </div>

        <div class="flex-1 w-8/10 h-96 mt-3">
            <img class="rounded-md h-full w-full object-cover" :src="apartment.image_path" :alt="apartment.title">
        </div>

        <div class="grid gap-8 grid-cols-1 gap-y-6 sm:mt-10 sm:gap-y-0 lg:grid-cols-2"> 

            <div class="rounded-md h-96 mt-10 bg-gray-200 p-4">

                <!-- info appartemento -->
                <div>
                    <h4 class="font-bold ms-2">Cosa troverai</h4>
                    <span class="block"><i class="fa-solid fa-house-chimney"></i> Numero di stanze - {{ apartment.rooms }}</span>
                    <span class="block"><i class="fa-solid fa-bed"></i> Numero di letti - {{ apartment.beds }}</span>
                    <span class="block"><i class="fa-solid fa-toilet-paper"></i> Numero di bagni - {{ apartment.bathrooms }}</span>
                </div>

                <!-- servizi appartamento -->
                <div class="">
                    <h4 class="font-bold ms-2">Servizi</h4>
                    <div class="ms-2 mb-2" v-for="service in apartment.services">
                        {{ service.name }}
                    </div>
                </div>

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

  .loader-container{
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div{
    span.block{
        padding: 0.5em;
        font-size: 18px;
    }
  }
</style>

