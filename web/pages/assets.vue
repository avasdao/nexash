<script setup>
/* Import modules. */
import numeral from 'numeral'

useHead({
    title: 'Assets - NexaShell',
    meta: [{
        name: 'description',
        content: 'Assets'
    }]
})


const topAssets = ref(null)


const init = async () => {
    const response = await $fetch('/api/assets/top')
        .catch(err => console.error(err))
    // console.log('RESPONSE', response)

    topAssets.value = response.filter(_asset => {
        return _asset.documentUrl
    })
}


onMounted(() => {
    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

<template>
    <main class="px-3 max-w-7xl mx-auto">
        <!-- <section class="my-5 max-w-7xl mx-auto">
            <h1 class="text-4xl font-medium">
                Assets
            </h1>

            <p>
                Chain Value -- $0.00
            </p>
        </section> -->

        <section class="py-5 flex flex-col grid grid-cols-1 sm:grid-cols-2 gap-5">
            <h2 class="col-span-1 sm:col-span-2 text-3xl font-medium">
                Featured Assets
            </h2>

            <div
                v-for="asset of topAssets"
                :key="asset.token"
                class="px-3 py-1 bg-amber-200 border-2 border-amber-400 rounded-lg shadow"
            >
                <h2 class="text-2xl text-amber-800 font-medium">
                    {{asset.name}}
                </h2>

                <h3 class="text-lg text-amber-600 font-medium">
                    ${{asset.ticker}}
                </h3>

                <h5 class="text-xs text-amber-700 font-medium">
                    Decimals: {{asset.decimals || 0}}
                </h5>

                <h5 class="text-xs text-amber-700 font-medium truncate">
                    {{asset.token}}
                </h5>

                <h5 class="text-xs text-amber-700 font-medium truncate">
                    {{asset.documentUrl}}
                </h5>

                <h4 class="text-amber-600 font-medium">
                    <span class="text-lg text-amber-700 font-bold">
                        {{numeral(asset.txCount).format('0,0')}}
                    </span>
                    transactions
                </h4>
            </div>
            <!-- <pre>{{topAssets}}</pre> -->
        </section>
    </main>
</template>
