<script setup lang="ts">
useHead({
    title: 'Blank — NexaShell',
    meta: [
        { name: 'description', content: 'NexaShell makes building your next BIG idea effortless.' }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

onBeforeMount(() => {
    System.$state = JSON.parse(localStorage.getItem('system'))
    // add additional states here...
})

watch(System.$state, (_state) => {
    localStorage.setItem('system', JSON.stringify(_state))
})
// watch additional states here...

onMounted(() => {
    System.init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

<template>
    <!-- <main class="flex flex-col h-screen"> -->
    <main class="">
        <Header />

        <!-- <section class="flex-1 overflow-y-auto"> -->
        <section class="">
            <slot />

            <Footer />
        </section>
    </main>
</template>
