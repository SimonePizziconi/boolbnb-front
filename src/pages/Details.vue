<script>
    export default {
        name: 'Details'
    }
</script>

<template>
    <div class="container m-auto text">
        <h1 class="">Titolo Appartamento</h1> <span>&hearts;</span>
        <div class="flex">
            <div class="flex-1 w-8/10 h-96 mt-3">
                <img class="rounded-md h-full w-full object-cover" src="https://panoramaliving.it/fileadmin/_processed_/0/4/csm_luxury-apartment-living-wohnk%C3%BCche_488071d7d8.jpg" alt="">
            </div>
            <div class="flex-1 w-2/10 h-96 mt-3 bg-gray-200 text-center"> 
                <h6>Titolo Descrittivo Appartamento</h6>
                <span>6 Stanze - 2 Letti - 2 Bagni - 20 M2 </span>
            </div>
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

