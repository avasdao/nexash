<script setup>
useHead({
    title: 'Transactions - Nexa Shell',
    meta: [{
        name: 'description',
        content: 'Transactions'
    }]
})
</script>

<template>
    <main class="">
        <HeaderView />

        <main class="max-w-7xl mx-auto">
            <h1 class="text-4xl font-medium">
                Transactions
            </h1>

            <p>
                Watch a real-time feed of the Nexa memory pool.
            </p>
        </main>

        <FooterView />
    </main>
</template>
