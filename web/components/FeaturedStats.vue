<script setup>
/* Import modules. */
import numeral from 'numeral'
import { ref } from 'vue'

const TICKER_UPDATE_INTERVAL = 30000 // default: 30 seconds

/* Initialize NEX/USD holder. */
const mexUsd = ref(null)

const ENDPOINT = 'https://nexa.exchange/mex'

const updateTicker = async () => {
    const price = await $fetch(ENDPOINT)
        .catch(err => console.error)
    // console.log('MEX PRICE', price)

    mexUsd.value = numeral(price).format('$0,0.00[00]')
}

/* Start price update (interval). */
setInterval(updateTicker, TICKER_UPDATE_INTERVAL)

/* Update price. */
updateTicker()

</script>

<template>
    <main class="flex flex-col lg:flex-row gap-4">
        <section class="h-full w-full lg:w-fit px-5 py-2 bg-yellow-100 border-2 border-yellow-400 rounded-lg shadow-md">
            <h3 class="text-yellow-600 text-sm font-medium uppercase">
                Circulating Supply
            </h3>

            <h2 class="text-3xl font-bold">
                2.251T
                <span class="text-lg">/ 21.0T</span>
            </h2>

            <h4 class="text-base font-medium">
                10.7% <span class="text-xs">is circulating</span>
            </h4>
        </section>

        <section class="h-full w-full lg:w-fit px-5 py-2 bg-yellow-100 border-2 border-yellow-400 rounded-lg shadow-md">
            <h3 class="text-yellow-600 text-sm font-medium">
                <span class="uppercase">
                    Price
                </span>

                <span class="px-2 py-1 text-xs bg-green-100 border-2 border-green-400 rounded-full">
                    Rank #360
                </span>
            </h3>

            <h2 class="text-3xl font-bold">
                {{mexUsd}}
                <span class="text-lg">↑ 28.16%</span>
            </h2>

            <h4 class="flex flex-row justify-between text-base font-medium">
                <span>
                    <span class="text-xs">24h Vol:</span> $24.1M
                </span>

                <span>
                    <span class="text-xs">MCap:</span> $63.4M
                </span>
            </h4>

            <small class="flex w-full justify-end text-yellow-600 text-xs font-medium">
                Updated at 05:28:56 EDT
            </small>
        </section>
    </main>
</template>
