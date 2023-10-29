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

const route = useRoute()
// console.log('ROUTE PARAMS', route.params)

/* Set id. */
const id = route.params.id
// console.log('CONTRACT ID', id)

const init = async () => {
    /* Initialize locals. */
    let response

    /* Request contract. */
    response = await $fetch('/v1/contract/' + id)
        .catch(err => console.error(err))
    console.log('RESPONSE', response)

    /* Set contract details. */
    contract.value = response

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
        <div class="px-3 flex flex-col gap-4">
            <header class="">
                <h1 class="text-3xl font-medium truncate">
                    {{contract?.txidem}}
                </h1>

                <span class="text-xs text-gray-400">
                    txid: {{contract?.txid}}
                </span>
            </header>

            <div>
                <div class="sm:hidden">
                    <label for="tabs" class="sr-only">Select a tab</label>
                    <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
                    <select id="tabs" name="tabs" class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        <option selected>Summary</option>
                        <option>Inputs</option>
                        <option>Outputs</option>
                        <option>Privacy Report</option>
                        <option>Cross-check</option>
                    </select>
                </div>
                <div class="hidden sm:block">
                    <div class="border-b border-gray-200">
                        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                            <a href="javascript://" class="border-indigo-500 text-indigo-600 flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium">
                                Overview
                            </a>

                            <a href="javascript://" class="border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700 flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium">
                                Inputs
                                <span class="bg-gray-100 text-gray-900 ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block">
                                    {{contract?.vin.length}}
                                </span>
                            </a>

                            <a href="javascript://" class="border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700 flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium" aria-current="page">
                                Outputs
                                <span class="bg-gray-100 text-gray-900 ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block">
                                    {{contract?.vout.length}}
                                </span>
                            </a>

                            <a href="javascript://" class="border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700 flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium">
                                Dev Tools
                            </a>

                            <NuxtLink :to="'/tx/' + id + '/privacy'" class="border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700 flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium">
                                Privacy Report
                                <svg class="mx-1 w-3 h-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
                                </svg>
                            </NuxtLink>

                            <NuxtLink :to="'https://explorer.nexa.org/tx/' + id" target="_blank" class="border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700 flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium">
                                Cross-Check
                                <svg class="mx-1 w-3 h-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
                                </svg>
                            </NuxtLink>
                        </nav>
                    </div>
                </div>
            </div>

            <div v-if="contract" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <TransactionItem
                    title="Block Height"
                    :value="contract.height"
                />

                <TransactionItem
                    title="Confirmations"
                    :value="contract.confirmations"
                />

                <TransactionItem
                    title="Fee"
                    :value="contract.fee + ' NEXA'"
                />

                <TransactionItem
                    title="Size"
                    :value="contract.size"
                />

                <TransactionItem
                    title="Version"
                    :value="contract.version"
                />

                <TransactionItem
                    title="Lock Time"
                    :value="contract.locktime"
                />

                <TransactionItem
                    title="Block Hash"
                    :value="contract.blockhash"
                />

                <TransactionItem
                    title="Time"
                    :value="contract.time"
                />

                <TransactionItem
                    title="Block Time"
                    :value="contract.blocktime"
                />

                <TransactionItem
                    title="Raw Hex"
                    :text="contract.hex.match(/.{1,16}/g).join(' ')"
                    class="col-span-3"
                />
            </div>

            <!-- <pre class="block text-xs font-medium">{{ contract }}</pre> -->
        </div>
    </main>

    <main v-else class="max-w-7xl mx-auto">
        <div class="px-5 py-20 flex w-full justify-center">
            <h1 class="text-4xl font-medium">
                Oops! No contract found
            </h1>
        </div>
    </main>
</template>
