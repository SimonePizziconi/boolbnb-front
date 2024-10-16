<script>
    export default {
        name: 'home',
        data() {
          return {
            appartamenti: [
                {
                    title: "Monolocale moderno in centro",
                    image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
                },
                {
                    title: "Appartamento spazioso vicino al parco",
                    image_url: "https://images.unsplash.com/photo-1502672023488-70e25813eb80"
                },
                {
                    title: "Monolocale in zona storica",
                    image_url: "https://images.unsplash.com/photo-1598928506311-2484d0de5a3b"
                },
                {
                    title: "Trilocale vicino al mare",
                    image_url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
                },
                {
                    title: "Attico di lusso con terrazza",
                    image_url: "https://images.unsplash.com/photo-1590490357863-216a9f5b865f"
                },
                {
                    title: "Bilocale accogliente con giardino",
                    image_url: "https://images.unsplash.com/photo-1560185127-6a9f85aa4396"
                },
                {
                    title: "Villa indipendente in campagna",
                    image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
                },
                {
                    title: "Appartamento in stile rustico",
                    image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
                },
                {
                    title: "Casa al mare con piscina",
                    image_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
                },
                {
                    title: "Appartamento in villa storica",
                    image_url: "https://images.unsplash.com/photo-1532339142461-71e6b7e11946"
                }
            ]
            
          }
        },
    }
</script>

<template>
    <h1 class="p-4 bg-blue-500 text-white text-center rounded-md sm:bg-red-500 md:bg-green-500">Benvenuto nella HomePage di BoolBnb!</h1>

    <div class="container m-auto text">
        <div class="text-center w-full bg-red-500 h-10 rounded">
            QUI CI FINIRA' LA BARRA DEI FILTRI
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <!-- <div class="square bg-blue-500 rounded sm:bg-red-500 md:bg-green-500 lg:bg-blue-300" ></div> -->
            <div v-for="appartamento in appartamenti" :key="appartamento.title" class="square bg-blue-500 rounded-md sm:bg-red-500 md:bg-green-500 lg:bg-blue-300" >
              <img :src="appartamento.image_url" :alt="appartamento.title" class="w-fill h-full rounded object-cover">
            </div>
            
            
            
            
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
