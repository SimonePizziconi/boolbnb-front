<script>
    export default {
        name: 'home'
    }
</script>

<template>
    <h1 class="p-4 bg-blue-500 text-white text-center rounded sm:bg-red-500 md:bg-green-500">Benvenuto nella HomePage di BoolBnb!</h1>

    <div class="container m-auto">
        <div class="text-center">QUI CI FINIRA' LA BARRA DEI FILTRI</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <div class="square bg-blue-500 rounded sm:bg-red-500 md:bg-green-500 lg:bg-blue-300" ></div>
            <div class="square bg-blue-500 rounded sm:bg-red-500 md:bg-green-500 lg:bg-blue-300"></div>
            <div class="square bg-blue-500 rounded sm:bg-red-500 md:bg-green-500 lg:bg-blue-300"></div>
            <div class="square bg-blue-500 rounded sm:bg-red-500 md:bg-green-500 lg:bg-blue-300"></div>
            <div class="square bg-blue-500 rounded sm:bg-red-500 md:bg-green-500 lg:bg-blue-300"></div>
            <div class="square bg-blue-500 rounded sm:bg-red-500 md:bg-green-500 lg:bg-blue-300"></div>
            <div class="square bg-blue-500 rounded sm:bg-red-500 md:bg-green-500 lg:bg-blue-300"></div>
            <div class="square bg-blue-500 rounded sm:bg-red-500 md:bg-green-500 lg:bg-blue-300"></div>
            <div class="square bg-blue-500 rounded sm:bg-red-500 md:bg-green-500 lg:bg-blue-300"></div>
            <div class="square bg-blue-500 rounded sm:bg-red-500 md:bg-green-500 lg:bg-blue-300"></div>
            <div class="square bg-blue-500 rounded sm:bg-red-500 md:bg-green-500 lg:bg-blue-300"></div>
            <div class="square bg-blue-500 rounded sm:bg-red-500 md:bg-green-500 lg:bg-blue-300"></div>
            <div class="square bg-blue-500 rounded sm:bg-red-500 md:bg-green-500 lg:bg-blue-300"></div>
            
            
            
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
  margin-top: 5%;
  margin-bottom: 5%;

  .square {
    aspect-ratio: 1 / 1; // Mantiene i quadrati proporzionati
    margin: 20px;
  }
}
</style>
