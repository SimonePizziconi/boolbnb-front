<script>
    import { store } from '../store/store.js';
    import axios from 'axios';

    export default {
        name: 'ContactForm',

        props: {
            apartmentSlug: String
        },

        data(){
            return{
                first_name:'',
                last_name:'',
                email:'',
                message:'',
                errors: {
                    first_name:[],
                    last_name:[],
                    email:[],
                    message:[],
                },
                sending: false,
                sent:false,
                loggedUserEmail: ''
            }
        },

        methods:{
            getUser(){
            axios.get(store.apiUrl + 'user', { withCredentials: true })
                .then(res => {
                    if(!res.data.user){
                        this.email = '';
                    }else{
                        this.email = res.data.user.email; 
                    }
                console.log(this.email);
                
                })
                .catch(error => {
                console.log(error.message);
                })
            },

            getData(){
                this.sending = true;

                const data = {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    message: this.message
                }
                console.log(data);
                
                axios.post(store.apiUrl + 'message/' + this.apartmentSlug, data)
                    .then(res => {
                        this.sending = false;
                        console.log(res.data);
                        if(!res.data.success){
                            this.errors = res.data.errors;
                        }else{
                            this.sent = true;
                            this.errors = {
                                first_name:[],
                                last_name:[],
                                email:[],
                                message:[],
                            }
                        }
                        
                    })
            }
        },

        mounted(){
            this.getUser()
            console.log(this.apartmentSlug);
            
        }
    }

</script>

<template>

    <div class="isolate py-8 px-8 shadow-lg rounded-md border border-primay">
        
        <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl border-b-2 pb-4 border-secondary">Contatta il proprietario</h2>
        </div>

        <div v-if="!sent">

            <form v-if="!sending" action="#" method="POST" class="mx-auto mt-10 max-w-xl sm:mt-10" @submit.prevent="getData">
                <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                
                <!-- nome -->
                <div>
                    <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">Nome</label>
                    <div class="mt-2.5">
                    <input v-model="first_name" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6">
                    </div>
                    <p class="text-red-600 text-xs mt-1">{{ errors.first_name?.toString() }}</p>
                </div>

                <!-- cognome -->
                <div>
                    <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Cognome</label>
                    <div class="mt-2.5">
                    <input v-model="last_name" type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6">
                    </div>
                    <p class="text-red-600 text-xs mt-1">{{ errors.last_name?.toString() }}</p>
                </div>

                <!-- email -->
                <div class="sm:col-span-2">
                    <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                    <div class="mt-2.5">
                    <input v-model="email" type="email" name="email" id="email" autocomplete="email" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6" >
                    </div>
                    <p class="text-red-600 text-xs mt-1">{{ errors.email?.toString() }}</p>
                </div>

                <!-- messaggio -->
                <div class="sm:col-span-2">
                    <label for="message" class="block text-sm font-semibold leading-6 text-gray-900">Messaggio</label>
                    <div class="mt-2.5">
                    <textarea v-model="message" name="message" id="message" rows="4" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"></textarea>
                    </div>
                    <p class="text-red-600 text-xs mt-1">{{ errors.message?.toString() }}</p>
                </div>
                
                    <!-- invio -->
                    </div>
                        <div class="mt-10">
                        <button type="submit" class="block w-full rounded-md bg-secondary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2         focus-visible:outline-secondary transition delay-150 duration-300">Invia</button>
                    </div>
                </form>

            <div v-else class="min-h-[490px] flex items-center justify-center">
                <div class="loader m-5 mx-auto"></div>
            </div>
           
        </div>

        <div v-else class="min-h-[490px] flex items-center justify-center border-b-2 border-secondary">
            <h2 class="font-bold">Messaggio inviato!</h2>
        </div>
            


    </div>

    

</template>

<style lang="scss" scoped>

    /* HTML: <div class="loader"></div> */
    .loader {
    width: calc(80px / cos(45deg));
    height: 14px;
    --c: #006D77 0 15px,#0000 0 20px;
    background: 
        repeating-linear-gradient(135deg,var(--c)) left top,
        repeating-linear-gradient( 45deg,var(--c)) left bottom;
    background-size:  200% 50%;
    background-repeat: no-repeat;
    animation: l4 2s infinite linear;
    border-radius: 30px;
    }
    @keyframes l4 {
        100% {background-position:top right,bottom right}
    }

</style>