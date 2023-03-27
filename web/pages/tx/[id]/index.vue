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
  transaction(txid: [${id}], txidem: [${id}]) {
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


/* Make query request. */
const transaction = await $fetch(ENDPOINT,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query }),
    })
    .catch(err => console.error(err))

</script>

<template>
    <main class="">
        <main class="max-w-7xl mx-auto">
            <h1 class="text-4xl font-medium">
                Transaction
            </h1>

            <pre class="block text-lg font-medium">
                {{ transaction }}
            </pre>

            <NuxtLink :to="'/tx/' + txid + '/privacy'" class="text-lg text-blue-500 font-medium hover:underline">
                View Privacy Report
            </NuxtLink>

            <section class="p-32">
                <div class="bg-yellow-100 border-4 border-yellow-400 rounded-xl">
                    <pre>{{debug}}</pre>
                </div>
            </section>
        </main>
    </main>
</template>
