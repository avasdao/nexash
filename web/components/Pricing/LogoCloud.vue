<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="bg-purple-600">
        <div class="mx-auto max-w-7xl py-16 px-6 sm:py-20 lg:px-8">
            <div class="lg:space-y-10">
                <h2 class="text-3xl font-bold tracking-tight text-white">The world's most innovative companies use our app</h2>
                <div class="mt-8 flow-root lg:mt-0">
                    <div class="-mt-4 -ml-8 flex flex-wrap justify-between lg:-ml-4">
                        <div class="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
                            <img class="h-12" src="https://tailwindui.com/img/logos/tuple-logo-purple-200.svg" alt="Tuple" />
                        </div>

                        <div class="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
                            <img class="h-12" src="https://tailwindui.com/img/logos/mirage-logo-purple-200.svg" alt="Mirage" />
                        </div>

                        <div class="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
                            <img class="h-12" src="https://tailwindui.com/img/logos/statickit-logo-purple-200.svg" alt="StaticKit" />
                        </div>

                        <div class="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
                            <img class="h-12" src="https://tailwindui.com/img/logos/transistor-logo-purple-200.svg" alt="Transistor" />
                        </div>

                        <div class="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
                            <img class="h-12" src="https://tailwindui.com/img/logos/workcation-logo-purple-200.svg" alt="Workcation" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
