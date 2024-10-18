<script>
import ttServices from '@tomtom-international/web-sdk-services';

export default {
    name: 'SearchBar',
    data() {
        return {
            searchQuery: '',
            results: [],
        };
    },
    methods: {
        searchLocation() {
            if (this.searchQuery.length > 2) {
                ttServices.services
                    .fuzzySearch({
                        key: 'd0Xq2xNT1UVJmJOO7pFoBBiHcFLGGy2Q',
                        query: this.searchQuery,
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
            alert(`Hai selezionato: ${result.address.freeformAddress}`);
            this.results = [];
            this.searchQuery = result.address.freeformAddress;
        },
    },
};
</script>

<template>
    <div class="relative w-full max-w-md">
        <div class="flex space-x-2">
            <input
                type="text"
                v-model="searchQuery"
                placeholder="Cerca una posizione..."
                @input="searchLocation"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-black"
            />
            <button
                @click="searchLocation"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring"
            >
                Cerca
            </button>
        </div>
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