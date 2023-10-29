<script setup>
useHead({
    title: 'Contract Details - NexaShell',
    meta: [{
        name: 'description',
        content: 'Transaction'
    }]
})

const isLoaded = ref(false)
const contract = ref(null)

/* Initialize route. */
const route = useRoute()

/* Set id. */
const id = route.params.id

const init = async () => {
    /* Initialize locals. */
    let response

    /* Request contract. */
    response = await $fetch('/v1/contract/' + id)
        .catch(err => console.error(err))
    // console.log('RESPONSE', response)

    /* Set contract. */
    contract.value = response
    // console.log('CONTRACT', contract.value)

    /* Set flag. */
    isLoaded.value = true
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
    <main v-if="!isLoaded" class="max-w-5xl mx-auto py-20">
        <h2 class="text-3xl font-medium text-center">
            Loading. Please wait...
        </h2>
    </main>

    <main v-else-if="contract" class="max-w-7xl mx-auto py-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <section>
                <div class="flex flex-row items-center gap-3">
                    <img :src="contract?.iconUrl" class="w-16 h-auto" />

                    <h1 class="text-5xl font-light tracking-widest uppercase">
                        {{contract?.title}}
                    </h1>
                </div>

                <h3 class="text-lg font-medium text-gray-500 truncate">
                    {{contract?.id}}
                </h3>

                <div class="flex flex-row gap-5">
                    <h1>version: {{contract?.version}}</h1>

                    <h1>type: {{contract?.type}}</h1>
                </div>

            </section>

            <section>
                <img :src="contract?.bannerUrl" class="w-full border-4 border-amber-400" />
            </section>
        </div>

        <!-- <pre class="block text-xs font-medium">{{ contract }}</pre> -->
    </main>

    <main v-else class="max-w-7xl mx-auto">
        <div class="px-5 py-20 flex w-full justify-center">
            <h1 class="text-4xl font-medium">
                Oops! No contract found
            </h1>
        </div>
    </main>
</template>
