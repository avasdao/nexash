<script setup>
useHead({
    title: 'Transaction - Nexa Shell',
    meta: [{
        name: 'description',
        content: 'Transaction'
    }]
})

const route = useRoute()

console.log('ROUTE PARAMS', route.params)

const txid = route.params.txid
</script>

<template>
    <main class="">
        <HeaderView />

        <main class="max-w-7xl mx-auto">
            <h1 class="text-4xl font-medium">
                Transaction
            </h1>

            <span class="block text-lg font-medium">
                {{ txid }}
            </span>
        </main>

        <FooterView />
    </main>
</template>
