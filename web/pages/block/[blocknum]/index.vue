<script setup>
useHead({
    title: 'Block - Nexa Shell',
    meta: [{
        name: 'description',
        content: 'Block'
    }]
})

const route = useRoute()

console.log('ROUTE PARAMS', route.params)

const blocknum = route.params.blocknum
</script>

<template>
    <main class="">
        <HeaderView />

        <main class="max-w-7xl mx-auto">
            <h1 class="text-4xl font-medium">
                Block
            </h1>

            <p>
                {{blocknum}}
            </p>
        </main>

        <FooterView />
    </main>
</template>
