<script setup lang="ts">
useHead({
    title: 'MetaNet — NexaShell',
    meta: [
        { name: 'description', content: 'MetaNet makes building your next BIG idea effortless.' }
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
    <main class="max-w-7xl mx-auto px-3 py-5 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <header class="col-span-1 lg:col-span-5 flex flex-col gap-3">
            <h1 class="text-6xl sm:text-5xl font-medium">
                Meta
                <span class="block sm:inline text-4xl sm:text-5xl">Sidechain</span>
            </h1>

            <p class="w-full sm:w-3/4 lg:w-1/2">
                100% EVM-compatible <span class="font-medium text-rose-600">L2</span> sidechain <em>(powered by <NuxtLink to="https://docs.avax.network/subnets" target="_blank" class="text-blue-500 font-medium hover:underline">Avalanche Subnets</NuxtLink>)</em> <span class="font-medium text-rose-600">WARP cross-bridged</span> with Nexa's <span class="font-medium text-rose-600">L1</span> 100K TPS blockchain.
            </p>
        </header>

        <div class="mx-10 col-span-1 lg:col-span-5 border-t border-gray-300" />

        <div class="col-span-1 lg:col-span-3 flex flex-col gap-8">
            <section class="px-5 py-3 w-full grid grid-cols-2 gap-1 sm:gap-4 items-center bg-indigo-100 border-4 border-indigo-300 rounded-2xl shadow-md">
                <h2 class="col-span-2 text-3xl font-medium">
                    MetaNet
                    <span class="text-base">Mainnet</span>
                </h2>

                <h3 class="col-span-2 sm:col-span-1 text-gray-700 text-center sm:text-right">
                    Network name
                </h3>
                <h3 class="col-span-2 sm:col-span-1 text-lg font-medium text-center sm:text-left">
                    MetaNet
                </h3>

                <h3 class="col-span-2 sm:col-span-1 text-gray-700 text-center sm:text-right">
                    New RPC URL
                </h3>
                <NuxtLink to="https://nexa.sh/metanet" target="_blank" class="col-span-2 sm:col-span-1 text-blue-500 text-lg font-medium text-center sm:text-left hover:underline">
                    https://nexa.sh/metanet
                </NuxtLink>

                <h3 class="col-span-2 sm:col-span-1 text-gray-700 text-center sm:text-right">
                    Chain ID
                </h3>
                <NuxtLink to="https://chainlist.org/?search=7227" target="_blank" class="col-span-2 sm:col-span-1 text-blue-500 text-lg font-medium text-center sm:text-left hover:underline">
                    7227
                </NuxtLink>

                <h3 class="col-span-2 sm:col-span-1 text-gray-700 text-center sm:text-right">
                    Currency symbol
                </h3>
                <h3 class="col-span-2 sm:col-span-1 text-lg font-medium text-center sm:text-left">
                    NEXA
                </h3>

                <h3 class="col-span-2 sm:col-span-1 text-gray-700 text-center sm:text-right">
                    Block explorer URL
                </h3>
                <NuxtLink to="https://nexa.sh" target="_blank" class="col-span-2 sm:col-span-1 text-blue-500 text-lg font-medium text-center sm:text-left hover:underline">
                    https://nexa.sh
                </NuxtLink>
            </section>

            <section class="px-5 py-3 w-full grid grid-cols-2 gap-4 items-center bg-indigo-100 border-4 border-indigo-300 rounded-2xl shadow-md">
                <h2 class="col-span-2 text-3xl font-medium">
                    MetaTest
                    <span class="text-base">Testnet</span>
                </h2>

                <h3 class="col-span-2 sm:col-span-1 text-gray-700 text-center sm:text-right">
                    Network name
                </h3>
                <h3 class="col-span-2 sm:col-span-1 text-lg font-medium text-center sm:text-left">
                    MetaTest
                </h3>

                <h3 class="col-span-2 sm:col-span-1 text-gray-700 text-center sm:text-right">
                    New RPC URL
                </h3>
                <NuxtLink to="https://nexa.sh/metatest" target="_blank" class="col-span-2 sm:col-span-1 text-blue-500 text-lg font-medium text-center sm:text-left hover:underline">
                    https://nexa.sh/metatest
                </NuxtLink>

                <h3 class="col-span-2 sm:col-span-1 text-gray-700 text-center sm:text-right">
                    Chain ID
                </h3>
                <NuxtLink to="https://chainlist.org/?testnets=true&search=17227" target="_blank" class="col-span-2 sm:col-span-1 text-blue-500 text-lg font-medium text-center sm:text-left hover:underline">
                    17227
                </NuxtLink>

                <h3 class="col-span-2 sm:col-span-1 text-gray-700 text-center sm:text-right">
                    Currency symbol
                </h3>
                <h3 class="col-span-2 sm:col-span-1 text-lg font-medium text-center sm:text-left">
                    NEXA
                </h3>

                <h3 class="col-span-2 sm:col-span-1 text-gray-700 text-center sm:text-right">
                    Block explorer URL
                </h3>
                <NuxtLink to="https://nexa-test.sh" target="_blank" class="col-span-2 sm:col-span-1 text-blue-500 text-lg font-medium text-center sm:text-left hover:underline">
                    https://nexa-test.sh
                </NuxtLink>
            </section>
        </div>

        <section class="col-span-1 lg:col-span-2 w-full flex flex-col items-center gap-8">
            <p class="text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, at possimus perspiciatis sapiente molestiae ab, eveniet, facere corrupti eaque pariatur adipisci nesciunt vitae quasi. Explicabo iste pariatur sint voluptas odio!
            </p>

            <img src="~/assets/lottie/101887-blockchain.gif" class="w-96 h-auto" />
        </section>
    </main>

    <FooterView />
</template>
