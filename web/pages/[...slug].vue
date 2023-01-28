<script setup>
useHead({
    title: 'Universal Handler - Nexa Shell',
    meta: [{
        name: 'description',
        content: 'Universal Handler'
    }]
})

const route = useRoute()

console.log('ROUTE PARAMS', route.params)

const slug = route.params.slug
</script>

<template>
    <main class="">
        <HeaderView />

        <main class="max-w-7xl mx-auto">
            <h1 class="text-4xl font-medium">
                Universal Handler
            </h1>

            <span class="block text-lg font-medium">
                SLUG -> {{ slug }}
            </span>
        </main>

        <FooterView />
    </main>
</template>
