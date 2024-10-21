<script>

    export default {
        name: 'ContactForm'
    }

</script>

<template>

    <div class="isolate py-8 px-8 shadow-lg rounded-md border border-primay">

        <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contatta il proprietario</h2>
        </div>

        <form action="#" method="POST" class="mx-auto mt-10 max-w-xl sm:mt-10">
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            
            <!-- nome -->
            <div>
                <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">Nome</label>
                <div class="mt-2.5">
                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6">
                </div>
            </div>

            <!-- cognome -->
            <div>
                <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Cognome</label>
                <div class="mt-2.5">
                <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6">
                </div>
            </div>

            <!-- email -->
            <div class="sm:col-span-2">
                <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                <div class="mt-2.5">
                <input type="email" name="email" id="email" autocomplete="email" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6">
                </div>
            </div>

            <!-- messaggio -->
            <div class="sm:col-span-2">
                <label for="message" class="block text-sm font-semibold leading-6 text-gray-900">Messaggio</label>
                <div class="mt-2.5">
                <textarea name="message" id="message" rows="4" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"></textarea>
                </div>
            </div>
            
            <!-- invio -->
            </div>
                <div class="mt-10">
                <button type="submit" class="block w-full rounded-md bg-secondary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2         focus-visible:outline-secondary transition delay-150 bg-blue-500 hover:bg-indigo-500 duration-300">Invia</button>
            </div>
        </form>

    </div>

</template>

<style>

</style>