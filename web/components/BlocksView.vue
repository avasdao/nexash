<script setup lang="ts">
/* Import modules. */
import { createClient } from 'graphql-ws'
import numeral from 'numeral'
import { ref } from 'vue'

const props = defineProps({
    title: String,
    value: String,
})

/* Initialize Blocks (array). */
const blocks = ref([])

const MAX_BLOCKS_DISPLAYED = 5

const displayedTxs = computed(() => {
    return blocks.value.sort((a, b) => {
        return b.height - a.height
    }).slice(0, MAX_BLOCKS_DISPLAYED)
})

/* Create client. */
const client = createClient({
    url: 'wss://nexa.sh/graphql',
})

const query = `
subscription Block {
  block {
    hash
    confirmations
    height
    size
    txcount
    feePoolAmt
    merkleroot
    time
    mediantime
    nonce
    bits
    difficulty
    chainwork
    utxoCommitment
    minerData
    status
    onMainChain
    ancestorhash
    nextblockhash
    txid
    txidem
  }
}`

const onNext = (_buffer) => {
    console.log('CONFIRMED', _buffer?.data?.block)

    if (_buffer?.data?.block) {
        blocks.value.push(_buffer?.data?.block)
    }
}

let unsubscribe = () => {
    /* complete the subscription */
}

/**
 * Start Updates
 */
const startUpdates = async () => {
    await new Promise((resolve, reject) => {
        unsubscribe = client.subscribe({ query }, {
            next: onNext,
            error: reject,
            complete: resolve,
        })
    })
}

/* Start updates. */
startUpdates()
</script>

<template>
    <main class="px-3 py-2 bg-gray-700 border-4 border-gray-900 rounded-xl shadow-md">
        <h2 class="text-2xl text-gray-100 font-medium">
            Most Recent Blocks
        </h2>

        <h3 class="text-xs text-gray-300 font-medium uppercase">
            avg block time is 1.337 minutes
        </h3>

        <section
            class="my-5 px-3 py-2 bg-gray-300 border-2 border-gray-500 rounded-lg shadow"
            v-for="block of displayedTxs" :key="block.height"
        >
            <span class="block text-base text-gray-700 font-medium uppercase">
                #{{numeral(block.height).format('0,0')}}
            </span>

            <NuxtLink class="text-sm text-gray-700 font-medium" :to="'block/' + block.height">
                {{block.hash}}
            </NuxtLink>
        </section>
    </main>
</template>
