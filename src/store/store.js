import { reactive } from "vue";

export const store = reactive({
    apiUrl: 'http://localhost:8000/api/',
    searchQuery: '',
    lat: '',
    lng: '',
    radius: 20,
    rooms: 1,
    beds: 1,
    services: [],    
});