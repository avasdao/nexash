<script setup>
/* Import modules. */
import moment from 'moment'
import numeral from 'numeral'

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

const marketCap = computed(() => {
    return numeral(System.ticker?.quote.USD.marketCap).format('$0,0.00')
})

const vol24 = computed(() => {
    return numeral(System.ticker?.quote.USD.vol24).format('$0,0.00')
})

const volChg24 = computed(() => {
    return numeral(System.ticker?.quote.USD.volChg24).format('$0,0.00')
})

const pctChg24h = computed(() => {
    return numeral(System.ticker?.quote.USD.pctChg24h / 100.0).format('0.00%')
})

const numMarkets = computed(() => {
    return numeral(System.ticker?.numMarkets).format('0,0')
})

const circulatingSupply = computed(() => {
    return numeral(System.ticker?.circulatingSupply).format('0.000a').toUpperCase()
})

const pctCirculatingSupply = computed(() => {
    return numeral(System.ticker?.circulatingSupply / (21 * 10**12)).format('0.0%')
})

const updatedAt = computed(() => {
    return moment(System.ticker?.updatedAt).fromNow()
})

const init = () => {
    //
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
    <main class="flex flex-col lg:flex-row gap-4">
        <section class="h-full w-full lg:w-fit px-5 py-2 bg-yellow-100 border-2 border-yellow-400 rounded-lg shadow-md">
            <h3 class="text-yellow-600 text-sm font-medium uppercase">
                Market Capitalization
            </h3>

            <h2 class="text-3xl font-bold">
                {{marketCap}}
            </h2>

            <h4 class="text-base font-medium">
                {{numMarkets}} <span class="text-xs">markets trading $NEXA</span>
            </h4>

            <span class="px-2 py-1 text-xs bg-green-100 border-2 border-green-400 rounded-full">
                Rank #500+
            </span>
        </section>

        <section class="h-full w-full lg:w-fit px-5 py-2 bg-yellow-100 border-2 border-yellow-400 rounded-lg shadow-md">
            <h3 class="text-yellow-600 text-sm font-medium uppercase">
                Fair Market Price
            </h3>

            <h2 class="text-3xl font-bold">
                {{System.priceDisplay}}
                <span class="text-lg">{{pctChg24h}}</span>
                <svg v-if="pctChg24h[0] === '-'" class="inline w-4 h-auto text-red-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"></path>
                </svg>
                <svg v-if="pctChg24h[0] !== '-'" class="inline w-4 h-auto text-green-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"></path>
                </svg>
            </h2>

            <h4 class="flex flex-row justify-between text-base font-medium">
                <span>
                    <span class="text-xs">24h Vol</span> {{vol24}}
                </span>

                <span>
                    <span class="text-xs">24h Vol Chg</span> {{volChg24}}
                </span>
            </h4>
        </section>

        <section class="h-full w-full lg:w-fit px-5 py-2 bg-yellow-100 border-2 border-yellow-400 rounded-lg shadow-md">
            <h3 class="text-yellow-600 text-sm font-medium uppercase whitespace-nowrap">
                Circulating Supply
            </h3>

            <h2 class="text-3xl font-bold">
                {{circulatingSupply}}
                <span class="block text-lg">of 21 Trillion</span>
            </h2>

            <h4 class="text-base font-medium">
                {{pctCirculatingSupply}} <span class="text-xs">is circulating</span>
            </h4>
        </section>
    </main>

    <small class="-mt-2 px-5 flex w-full justify-end text-yellow-600 text-xs font-medium italic">
        Updated {{updatedAt}}
    </small>
</template>
