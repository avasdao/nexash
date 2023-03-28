<script setup>
useHead({
    title: 'Transaction - NexaShell',
    meta: [{
        name: 'description',
        content: 'Transaction'
    }]
})

const route = useRoute()

console.log('ROUTE PARAMS', route.params)

const id = route.params.id

/* Set Nexa GraphQL endpoint. */
const ENDPOINT = 'https://nexa.sh/graphql'

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
let transaction

/* Make query request. */
const result = await $fetch(ENDPOINT,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query }),
    })
    .catch(err => console.error(err))

if (result?.data?.transaction) {
    transaction = result.data.transaction[0]
}
</script>

<template>
    <main v-if="transaction" class="">
        <main class="max-w-7xl mx-auto">
            <section class="p-3">
                <h1 class="text-4xl font-medium">
                    {{transaction?.txidem}}
                </h1>

                <NuxtLink :to="'/tx/' + txid + '/privacy'" class="text-lg text-blue-500 font-medium hover:underline">
                    View Privacy Report
                </NuxtLink>

            </section>

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


            <pre class="block text-lg font-medium">
                {{ transaction }}
            </pre>

            <section class="p-32">
                <div class="bg-yellow-100 border-4 border-yellow-400 rounded-xl">
                    <pre>{{debug}}</pre>
                </div>
            </section>
        </main>
    </main>

    <main v-else class="max-w-7xl mx-auto">
        <div class="p-5 flex w-full justify-center">
            <h1 class="text-4xl font-medium">
                Oops! No transaction found
            </h1>
        </div>
    </main>
</template>
