<script>
import { store } from '../../store/store.js';
import ttServices from '@tomtom-international/web-sdk-services';

export default {
    name: 'SearchBar',
    data() {
        return {
            store,
            // searchQuery: '',
            // lat: '',
            // lng: '',
            results: [],
        };
    },
    methods: {
        searchLocation() {
            if (store.searchQuery.length > 2) {
                ttServices.services
                    .fuzzySearch({
                        key: 'd0Xq2xNT1UVJmJOO7pFoBBiHcFLGGy2Q',
                        query: store.searchQuery,
                    })
                    .then(response => {
                        this.results = response.results;
                    })
                    .catch(error => {
                        console.error('Errore nella ricerca:', error);
                    });
            } else {
                this.results = [];
            }
        },
        selectLocation(result) {
            console.log('Posizione selezionata:', result);
            this.results = [];
            store.searchQuery = result.address.freeformAddress;
            store.lat = result.position.lat;
            store.lng = result.position.lng;
        },
        submitSearch() {
            // Reindirizza alla pagina di ricerca con il parametro di ricerca
            this.$router.push({ name: "search", query: { q: store.searchQuery, lat: store.lat, lng: store.lng, radius: store.radius, rooms: store.rooms, beds: store.beds, services: store.selectedServices } });
        },
    },
    watch: {
        // Quando la route cambia, svuota i campi se esci dalla pagina di ricerca
        $route(to, from) {
            if (from.name === 'search' && to.name !== 'search') {
                store.searchQuery = '';
                store.lat = '';
                store.lng = '';
            }
        }
    },
};
</script>

<template>
    <div class="search-bar relative w-full max-w-md">
        <form @submit.prevent="submitSearch" class="flex space-x-2">
            <input
                type="text"
                v-model="store.searchQuery"
                placeholder="Cerca una destinazione..."
                @input="searchLocation"
                class="w-full p-2 border border-accent rounded-lg text-black focus:border-secondary  focus:outline-none"
            />
            <button
                type="submit"
                class="px-4 py-2 bg-accent text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring"
            >
                Cerca
            </button>
        </form>
        <ul
            v-if="results.length"
            class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto"
        >
            <li
                v-for="result in results"
                :key="result.id"
                @click="selectLocation(result)"
                class="p-2 cursor-pointer hover:bg-gray-100 text-black"
            >
                {{ result.address.freeformAddress }}
            </li>
        </ul>
    </div>
</template>


<style lang="scss" scoped>

</style>