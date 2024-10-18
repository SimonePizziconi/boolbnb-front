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
            },
            getServiceIcon(serviceName) {
            const icons = {
                'WiFi': 'wifi',
                'Posto Macchina': 'parking',
                'Piscina': 'swimmer',
                'Portineria': 'concierge-bell',
                'Sauna': 'hot-tub',
                'Vista Mare': 'water',
                'Aria Condizionata': 'snowflake',
                'Riscaldamento': 'temperature-high',
                'TV via Cavo': 'tv',
                'Cucina Completa': 'utensils',
                'Lavastoviglie': 'sink',
                'Lavatrice': 'tshirt',
                'Asciugatrice': 'wind',
                'Balcone': 'building',
                'Giardino Privato': 'leaf',
                'Barbecue': 'fire',
                'Vasca Idromassaggio': 'hot-tub',
                'Camino': 'fire',
                'Accesso Disabili': 'wheelchair',
                'Animali Ammessi': 'paw',
                'Palestra': 'dumbbell',
                'Spa': 'spa',
                'Servizio in Camera': 'concierge-bell',
                'Colazione Inclusa': 'coffee',
                'Ristorante in Loco': 'utensils',
                'Navetta Aeroporto': 'shuttle-van',
                'Parco Giochi': 'child',
                'Deposito Bagagli': 'suitcase-rolling',
                'Parcheggio Bici': 'bicycle',
                'Noleggio Auto': 'car',
                'Servizio di Pulizia': 'broom',
                'Reception 24 Ore': 'clock',
                'Cassaforte': 'lock',
                'Frigorifero': 'carrot',
                'Mini Bar': 'wine-glass-alt',
                'Servizio Lavanderia': 'tshirt',
                'Cambio Biancheria': 'bed',
                'Vista Montagna': 'mountain',
                'Vicino alla Spiaggia': 'umbrella-beach',
                'Accesso alla Pista Ciclabile': 'bicycle'
            };

            // Restituisci l'icona corrispondente o una di default (es. 'question' per icone sconosciute)
            return icons[serviceName] || 'question';
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
            <span class="block"><i class="fa-solid fa-location-dot me-2"></i>{{ apartment.address }}</span>
        </div>

        <div class="flex-1 w-8/10 mt-3 pic-container rounded-md overflow-hidden">
            <img class="h-full w-full object-cover object-center transition-property:all hover:scale-105 duration-1000" :src="apartment.image_path" :alt="apartment.title">
        </div>

        <div class="grid lg:gap-8 grid-cols-1 gap-y-6 sm:mt-10 sm:gap-y-0 sm:gap-y-0 lg:grid-cols-3"> 

            <div class="rounded-md mt-10 bg-gray-100 p-4 h-fit col-span-2 shadow-lg border border-neutral">

                <!-- info appartemento -->
                <div>
                    <h4 class="font-bold ms-2">Cosa troverai</h4>
                    <span class="block"><i class="fa-solid fa-house-chimney"></i> Numero di stanze - {{ apartment.rooms }}</span>
                    <span class="block"><i class="fa-solid fa-bed"></i> Numero di letti - {{ apartment.beds }}</span>
                    <span class="block"><i class="fa-solid fa-toilet-paper"></i> Numero di bagni - {{ apartment.bathrooms }}</span>
                </div>

                <div class="border-t-2 border-secondary">
                    <h4 class="font-bold ms-2">Servizi</h4>

                    <div class="flex flex-col flex-wrap h-fit max-h-96">
                        <div class="ms-2 mb-1 me-2" v-for="service in apartment.services">
                            <i :class="`fas fa-${getServiceIcon(service.name)}`" class="text-lg"></i>    {{ service.name }} 
                        </div>
                    </div>
                </div>

            </div>

            <div class="rounded-md mt-10 text-center"> 
                <ContactForm></ContactForm>
            </div>

        </div>

        <div class="rounded-md flex-1 w-2/10 h-96 mt-10 bg-gray-200 text-center mt-20 mb-40"> 
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

  .pic-container{
    height: 60vh;
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

