<script setup>
useHead({
    title: 'Address - Nexa Shell',
    meta: [{
        name: 'description',
        content: 'Address'
    }]
})

const route = useRoute()

console.log('ROUTE PARAMS', route.params)

const address = route.params.address
</script>

<template>
    <main class="">
        <main class="max-w-7xl mx-auto">
            <h1 class="text-4xl font-medium">
                Address Details
            </h1>

            <p>
                {{address}}
            </p>
        </main>
    </main>
</template>
