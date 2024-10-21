<script>
import { store } from '../store/store.js';
import axios from 'axios';

export default {
    name: 'Search',
  data() {
    return {
      apartments: [],   
    };
  },
  computed: {
    searchQuery() {
      return this.$route.query || "";
    },
  },
  methods: {
    fetchSearchResults() {      
      // Effettua la chiamata API con il parametro di ricerca
      axios.get('http://localhost:8000/api/apartments/search', {
          params: {
            lat: this.searchQuery.lat,
            lng: this.searchQuery.lng,
          },
        })
        .then((res) => {
          console.log(res.data);
          ; 
        })
        .catch((error) => {
          console.log(error.message);
        })
    },
  },
  mounted() {
    this.fetchSearchResults();
  },
};
</script>

<template>
    <div>
        <h1>Risultati della ricerca per: "{{ searchQuery.q }}"</h1>
    </div>
</template>

<style scoped lang="scss">

</style>