<script>
    export default {
        name: 'register'
    }
</script>

<template>
    <div class="flex justify-center m-4">
        <h1>Registrati</h1>

    </div>
    <form action="" method="get">


        <div class="flex justify-center m-4">
            <div class="mb-3">
                <div class="col-md-4">
                    <label for="" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="" value="" required placeholder="inserisci il tuo nome"/>
                </div>
                <div class="col-md-4">
                    <label for="" class="form-label">Cognome</label>
                    <input type="text" class="form-control" id="" value="" required />
                </div>
                
                <label for="" class="form-label">Email</label>
                <input
                    type="email"
                    class="form-control"
                    name=""
                    id=""
                    aria-describedby="emailHelpId"
                    placeholder="abc@mail.com"
                />
                <small id="emailHelpId" class="form-text text-muted"
                    >Help text</small
                >
                <div class="mb-3">
                    <label for="" class="form-label">Password</label>
                    <input
                        type="password"
                        class="form-control"
                        name=""
                        id=""
                        placeholder=""
                    />
                </div>
                
            </div>
    
        </div>
        <div class="flex justify-center gap-4">
            <button class="btn" type="reset">Reset</button>
            <button type="submit">Invia</button>

        </div>
    </form>
    
</template>

<style scoped lang="scss">

</style>

