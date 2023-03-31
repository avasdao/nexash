<script setup lang="ts">
const props = defineProps({
    title: String,
    value: String,
})
</script>

<template>
    <main class="px-3 py-1 w-fit bg-green-100 border-2 border-green-300 rounded-lg shadow">
        <h3 class="block text-xs text-green-600 font-medium uppercase">
            {{title}}
        </h3>

        <span class="block text-green-900 font-medium">
            {{value}}
        </span>
    </main>
</template>
