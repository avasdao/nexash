<script setup>
useHead({
    title: 'Transaction - NexaShell',
    meta: [{
        name: 'description',
        content: 'Transaction'
    }]
})

/* Set Nexa GraphQL endpoint. */
const ENDPOINT = 'https://nexa.sh/graphql'

const isLoaded = ref(false)
const transaction = ref(null)

const route = useRoute()
// console.log('ROUTE PARAMS', route.params)

/* Set id. */
const id = route.params.id

const query = `
{
  transaction(txidem: "${id}", txid: "${id}") {
    txidem
    txid
    confirmations
    size
    version
    locktime
    spends
    sends
    fee
    vin {
      outpoint
      amount
      scriptSig {
        asm
        hex
      }
      sequence
    }
    vout {
      value
      type
      n
      scriptPubKey {
        asm
        hex
        type
        scriptHash
        argsHash
        addresses
      }
      outpoint
    }
    blockhash
    time
    blocktime
    hex
  }
}
`
// let transaction

// /* Make query request. */
// const result = await $fetch(ENDPOINT,
//     {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         body: JSON.stringify({ query }),
//     })
//     .catch(err => console.error(err))

// if (result?.data?.transaction) {
//     transaction = result.data.transaction[0]
// }

const init = async () => {
    /* Initialize locals. */
    let response

    /* Request transaction. */
    response = await $fetch('/v1/tx/' + id)
        .catch(err => console.error(err))
    console.log('RESPONSE', response)

    /* Set transaction details. */
    transaction.value = response

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

    <main v-else-if="transaction" class="max-w-7xl mx-auto py-10">
        <div class="px-3 flex flex-col gap-4">
            <header class="">
                <h1 class="text-3xl font-medium truncate">
                    {{transaction?.txidem}}
                </h1>

                <NuxtLink :to="'/tx/' + id + '/privacy'" class="w-full sm:w-fit block my-3 px-3 py-2 bg-rose-100 border-2 border-rose-600 text-lg text-rose-500 font-medium rounded-lg shadow hover:underline">
                    View Privacy Report
                </NuxtLink>

            </header>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TransactionItem
                    title="Transaction IDEM"
                    :value="transaction.txidem"
                />

                <TransactionItem
                    title="Transaction ID"
                    :value="transaction.txid"
                />

                <TransactionItem
                    title="Confirmations"
                    :value="transaction.confirmations"
                />

                <TransactionItem
                    title="Size"
                    :value="transaction.size"
                />

                <TransactionItem
                    title="Version"
                    :value="transaction.version"
                />

                <TransactionItem
                    title="Lock Time"
                    :value="transaction.locktime"
                />

                <TransactionItem
                    title="Spends"
                    :value="transaction.spends"
                />

                <TransactionItem
                    title="Sends"
                    :value="transaction.sends"
                />

                <TransactionItem
                    title="Fee"
                    :value="transaction.fee"
                />

                <TransactionItem
                    title="Inputs"
                    value="inputs here"
                />

                <TransactionItem
                    title="Outputs"
                    value="outputs here"
                />

                <TransactionItem
                    title="Block Hash"
                    :value="transaction.blockhash"
                />

                <TransactionItem
                    title="Time"
                    :value="transaction.time"
                />

                <TransactionItem
                    title="Block Time"
                    :value="transaction.blocktime"
                />

                <TransactionItem
                    title="Hex"
                    :value="transaction.hex"
                />
            </div>

            <!-- <pre class="block text-xs font-medium">{{ transaction }}</pre> -->
        </div>
    </main>

    <main v-else class="max-w-7xl mx-auto">
        <div class="p-5 flex w-full justify-center">
            <h1 class="text-4xl font-medium">
                Oops! No transaction found
            </h1>
        </div>
    </main>
</template>
