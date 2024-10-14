<script>
    export default {
        name: 'login'
    }
</script>

<template>
    <div class="flex justify-center m-4">
        <h1>Login</h1>

    </div>
    <div class="flex justify-center">
        <div class="mb-3">
            
            
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
        <button type="reset">Reset</button>
        <button type="submit">Accedi</button>

    </div>
    
</template>

<style scoped lang="scss">

</style>

