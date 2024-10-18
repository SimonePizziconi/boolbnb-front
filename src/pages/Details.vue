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
                'Frigorifero': 'icicles',
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
        </div>

        <div class="flex-1 w-8/10 h-96 mt-3">
            <img class="rounded-md h-full w-full object-cover" :src="apartment.image_path" :alt="apartment.title">
        </div>

        <div class="grid gap-8 grid-cols-1 gap-y-6 sm:mt-10 sm:gap-y-0 lg:grid-cols-2"> 

            <div class="rounded-md h-96 mt-10 bg-gray-200 p-4"> 
                <h4 class="font-bold">Cosa troverai</h4>
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

  .loader-container{
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>

