<script>
    import axios from 'axios';
    import { store } from '../store/store.js';
    import ContactForm from '@/components/ContactForm.vue';
    import Loader from '@/components/Loader.vue';
    import tt from '@tomtom-international/web-sdk-maps';
    import '@tomtom-international/web-sdk-maps/dist/maps.css';

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
                loading:true,
                userId: 0
            }
        },
        methods: {
            getApartment(){
                axios.get(store.apiUrl + 'apartment/' + this.slug)
                .then(res => {
                    this.apartment = res.data.apartment;
                    console.log(this.apartment);
                    this.loading = false;
                    this.$nextTick(() => {  // Assicuriamoci che il DOM sia pronto
                        this.showMap();
                    });
                })
                //console.log(this.slug);
            },
            getUser(){
                axios.get(store.apiUrl + 'user', { withCredentials: true })
                    .then(res => {
                        this.userId = res.data.user.id;
                        console.log(this.userId);
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            },
            // Funzione per mostrare la mappa
            showMap() {
                var apiKey = 'd0Xq2xNT1UVJmJOO7pFoBBiHcFLGGy2Q';

                if (this.apartment.latitude && this.apartment.longitude) {
                    // Crea la mappa
                    var map = tt.map({
                        key: apiKey,
                        container: 'map',  
                        center: [this.apartment.longitude, this.apartment.latitude],
                        zoom: 15
                    });

                    // Aggiungi un marcatore sulla mappa
                    var marker = new tt.Marker()
                        .setLngLat([this.apartment.longitude, this.apartment.latitude])
                        .addTo(map);

                    console.log('Latitudine:', this.apartment.latitude, 'Longitudine:', this.apartment.longitude);
                } else {
                    console.log('Coordinate mancanti per l\'appartamento con ID: ' + this.apartment.id);
                }
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

            // Restituisci l'icona corrispondente o una di default
            return icons[serviceName] || 'question';
            }
        },
        mounted(){
            this.slug = this.$route.params.slug
            this.getApartment();
            this.getUser();
        }
    }
</script>

<template>

<div class="loader-container" v-if="this.loading">
    <Loader></Loader>
</div>

<div class="mt-20 mb-20 px-5 lg:px-20 pt-16" v-else>

    <!-- Titolo e indirizzo -->
    <div>
        <h1 class="mt-2 text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">{{ apartment.title }}</h1>
        <span class="block mt-2 text-lg text-gray-600">
            <i class="fa-solid fa-location-dot me-2"></i>{{ apartment.address }}
        </span>
    </div>

    <!-- Immagine principale -->
    <div class="mt-4 pic-container rounded-md overflow-hidden">
        <img class="h-full w-full object-cover object-center transition-transform duration-1000 hover:scale-105" 
            :src="apartment.image_path" :alt="apartment.title">
    </div>

    <!-- Informazioni e servizi dell'appartamento -->
    <div class="grid gap-6 mt-10 lg:grid-cols-3"> 
        
        <!-- Info appartamento e servizi -->
        <div class=" bg-neutral p-4 rounded-md shadow-lg border border-neutral" :class="this.apartment.user_id !== this.userId ? 'col-span-2' : 'col-span-4'">

            <!-- Informazioni -->
            <div class="mb-6">
                <h4 class="font-bold text-lg">Cosa troverai</h4>
                <span class="block text-lg mt-2"><i class="fa-solid fa-house-chimney"></i> Numero di stanze - {{ apartment.rooms }}</span>
                <span class="block text-lg mt-2"><i class="fa-solid fa-bed"></i> Numero di letti - {{ apartment.beds }}</span>
                <span class="block text-lg mt-2"><i class="fa-solid fa-toilet-paper"></i> Numero di bagni - {{ apartment.bathrooms }}</span>
            </div>

            <!-- Servizi -->
            <div class="border-t-2 border-secondary pt-4">
                <h4 class="font-bold text-lg">Servizi</h4>

                <!-- Verifica se ci sono servizi -->
                <div class="flex flex-wrap mt-2" v-if="apartment.services && apartment.services.length > 0">
                    <div class="ms-2 mb-2 flex items-center" v-for="service in apartment.services" :key="service.id">
                        <i :class="`fas fa-${getServiceIcon(service.name)}`" class="text-lg mr-2"></i> 
                        <span class="text-lg">{{ service.name }}</span> 
                    </div>
                </div>
                <!-- Nessun servizio disponibile -->
                <div v-else>
                    <span class="ms-2 text-lg">Nessun servizio disponibile per questo appartamento.</span>
                </div>
            </div>

        </div>

        <!-- Contatto -->
        <div v-if="this.apartment.user_id !== this.userId" class="rounded-md bg-neutral shadow-lg border border-neutral p-4 lg:p-6">
            <ContactForm :apartmentSlug="this.slug"></ContactForm>
        </div>

        <!-- <div class="rounded-md p-4 lg:p-6 text-center"> 
            <ContactForm :apartmentSlug="this.slug"></ContactForm>
        </div> -->

    </div>

    <!-- Mappa TomTom -->
    <div class="border-t-2 border-secondary mt-10">
        <h4 class="mt-5 text-2xl">Dove sarai</h4>
        <div id="map" class="w-full h-64 sm:h-80 lg:h-96 rounded shadow mt-3"></div>
        <span class="block mt-2 text-lg">
            <i class="fa-solid fa-location-dot me-2"></i>{{ apartment.address }}
        </span>
    </div>

</div>
</template>


<style scoped lang="scss">
    h1{
        display: inline;
    }

    .pic-container {
        height: 40vh;
        @media (min-width: 1024px) {
            height: 60vh;
        }
    }

    .loader-container {
        height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>


