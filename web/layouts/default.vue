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

/**
 * Setup Hotkeys
 *
 * Manages the keyboard shortcuts used to improve UI/BX for power-builders.
 */
const setupHotkeys = () => {
    /* Create a new `keydown` event handler. */
    document.addEventListener('keydown', function onEvent(event) {
        if (event.key === 'Escape') {
            console.info('Canceling all open windows and requests...')
        }
        else if (event.key === 'Enter') {
            console.log('enter key pressed')
        }
        else if (event.key === 'ArrowUp') {
            console.log('up pressed')
        }
        else if (event.key === 'ArrowDown') {
            console.log('down pressed')
        }
        else if (event.key === '/') {
            console.log('open search win')
        }
    })
}

onMounted(() => {
    /* Initialize the (main) application. */
    System.init()

    /* Setup (global) hotkeys. */
    setupHotkeys()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <Header />
        <slot />
    <Footer />
</template>
