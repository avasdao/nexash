<script setup>
useHead({
    title: 'Privacy Report - Nexa Shell',
    meta: [{
        name: 'description',
        content: 'Privacy Report'
    }]
})

const route = useRoute()

console.log('ROUTE PARAMS', route.params)

const txid = route.params.txid
</script>

<template>
    <main class="">
        <main class="max-w-7xl mx-auto">
            <h1 class="text-4xl font-medium">
                Privacy Report
            </h1>

            <span class="block text-lg font-medium">
                {{ txid }}
            </span>
        </main>
    </main>
</template>
