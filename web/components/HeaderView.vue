<script setup>
/* Import modules. */
import numeral from 'numeral'
import { ref } from 'vue'

const isShowingSolutionsMenu = ref(false)
const isShowingMobileMenu = ref(false)

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
    <!-- <header class="hidden md:flex flex-col"> -->
    <header class="hidden md:flex flex-col sticky top-0 z-50 opacity-[.99]">
        <section class="py-1 bg-gradient-to-r from-rose-400 to-rose-600">
            <div class="max-w-7xl mx-auto flex justify-between">
                <NuxtLink to="/" class="flex gap-4 items-center">
                    <img class="h-6 w-auto sm:h-8" src="~/assets/icon.png" alt="" />

                    <h1 class="text-2xl text-gray-100 font-bold">
                        NexaShell
                    </h1>
                </NuxtLink>

                <section class="flex gap-4">
                    <input
                        type="text"
                        placeholder="What can I do for you?    (eg. /help)"
                        class="w-1/3 px-5 py-1 text-rose-100 placeholder:text-rose-100 font-medium bg-rose-700 border-2 border-rose-200 rounded hover:bg-rose-800"
                    />

                    <button class="px-3 py-1 bg-blue-100 border-2 border-blue-400 rounded hover:bg-blue-200">
                        <h3 class="text-xl font-medium">Get Connected</h3>
                    </button>
                </section>
            </div>
        </section>

        <section class="bg-white">
            <nav class="px-20 py-5 max-w-7xl mx-auto flex justify-between">
                <NuxtLink to="/" class="hover:underline">
                    Dashboard
                </NuxtLink>

                <NuxtLink to="/blocks" class="hover:underline">
                    Blocks
                </NuxtLink>

                <NuxtLink to="/txs" class="hover:underline">
                    Transactions
                </NuxtLink>

                <NuxtLink to="/assets" class="hover:underline">
                    Assets
                </NuxtLink>

                <NuxtLink to="/defi" class="hover:underline">
                    DeFi
                </NuxtLink>

                <NuxtLink to="/contracts" class="hover:underline">
                    Contracts
                </NuxtLink>
            </nav>

        </section>

        <section class="bg-gradient-to-r from-gray-100 to-gray-200">
            <div class="py-1 max-w-7xl mx-auto flex justify-end">
                <h3 class="px-3 py-1 flex items-center text-gray-500 mr-5 bg-gray-700 border-2 border-yellow-400 rounded-full">
                    <span class="text-yellow-100 text-sm">MEX/USD</span>
                    <span class="text-yellow-300 text-lg font-medium mx-1">{{mexUsd}}</span>
                </h3>
            </div>
        </section>
    </header>

    <header class="md:hidden sticky top-0 z-50 opacity-[.99]">
        <div class="relative bg-white">
            <div class="mx-auto flex max-w-7xl items-center justify-between p-6 md:justify-start md:space-x-10 lg:px-8">
                <div class="flex justify-start lg:w-0 lg:flex-1">
                    <NuxtLink to="/">
                        <span class="sr-only">NexaShell</span>
                        <img class="h-12 w-auto md:h-16" src="~/assets/icon.png" alt="" />
                    </NuxtLink>
                </div>

                <div class="py-1 max-w-7xl mx-auto flex justify-end">
                    <h3 class="px-3 py-1 flex items-center text-gray-500 mr-5 bg-gray-700 border-2 border-yellow-400 rounded-full">
                        <span class="text-yellow-100 text-sm">MEX/USD</span>
                        <span class="text-yellow-300 text-lg font-medium mx-1">{{mexUsd}}</span>
                    </h3>
                </div>

                <div class="-my-2 -mr-2 md:hidden">
                    <button
                        @click="isShowingMobileMenu = true"
                        type="button"
                        class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        aria-expanded="false"
                    >
                        <span class="sr-only">Open menu</span>
                        <!-- Heroicon name: outline/bars-3 -->
                        <svg class="h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>

            <!--
        Mobile menu, show/hide based on mobile menu state.

        Entering: "duration-200 ease-out"
        From: "opacity-0 scale-95"
        To: "opacity-100 scale-100"
        Leaving: "duration-100 ease-in"
        From: "opacity-100 scale-100"
        To: "opacity-0 scale-95"
    -->
            <div v-if="isShowingMobileMenu" class="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden">
                <div class="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div class="px-5 pt-5 pb-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <img class="h-12 w-auto" src="~/assets/icon.png" alt="NexaShell" />
                            </div>
                            <div class="-mr-2">
                                <button
                                    @click="isShowingMobileMenu = false"
                                    type="button"
                                    class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                >
                                    <span class="sr-only">Close menu</span>
                                    <!-- Heroicon name: outline/x-mark -->
                                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="mt-6">
                            <nav class="grid grid-cols-1 gap-7">

                                <NuxtLink to="/blocks" @click="isShowingMobileMenu = false" class="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50">
                                    <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                                        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"></path>
                                        </svg>
                                    </div>

                                    <div class="ml-4 text-base font-medium text-gray-900">
                                        Blocks
                                    </div>
                                </NuxtLink>

                                <NuxtLink to="/txs" @click="isShowingMobileMenu = false" class="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50">
                                    <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                                        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
                                        </svg>
                                    </div>

                                    <div class="ml-4 text-base font-medium text-gray-900">
                                        Transactions
                                    </div>
                                </NuxtLink>

                                <NuxtLink to="/assets" @click="isShowingMobileMenu = false" class="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50">
                                    <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                                        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>

                                    <div class="ml-4 text-base font-medium text-gray-900">
                                        Assets
                                    </div>
                                </NuxtLink>

                                <NuxtLink to="/defi" @click="isShowingMobileMenu = false" class="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50">
                                    <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                                        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"></path>
                                        </svg>
                                    </div>

                                    <div class="ml-4 text-base font-medium text-gray-900">
                                        DeFi
                                    </div>
                                </NuxtLink>

                                <NuxtLink to="/contracts" @click="isShowingMobileMenu = false" class="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50">
                                    <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                                        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.78 1.5 5.817 1.5 9s-.533 6.22-1.5 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889m-8.25.75l.213.09a1.687 1.687 0 002.062-.617l4.45-6.676a1.688 1.688 0 012.062-.618l.213.09"></path>
                                        </svg>
                                    </div>

                                    <div class="ml-4 text-base font-medium text-gray-900">
                                        Contracts
                                    </div>
                                </NuxtLink>

                            </nav>
                        </div>
                    </div>

                    <div class="py-6 px-5">
                        <div class="grid grid-cols-3 gap-4 text-center">
                            <NuxtLink to="" @click="isShowingMobileMenu = false" class="text-base font-medium text-gray-900 hover:text-gray-700">
                                Pricing
                            </NuxtLink>

                            <NuxtLink to="" @click="isShowingMobileMenu = false" class="text-base font-medium text-gray-900 hover:text-gray-700">
                                Partners
                            </NuxtLink>

                            <NuxtLink to="" @click="isShowingMobileMenu = false" class="text-base font-medium text-gray-900 hover:text-gray-700">
                                Company
                            </NuxtLink>
                        </div>

                        <div class="mt-6">
                            <a
                                href="javascript://"
                                @click="isShowingMobileMenu = false"
                                class="flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                            >
                                Get Connected
                            </a>
                            <!-- <p class="mt-6 text-center text-base font-medium text-gray-500">
                                Existing customer?
                                <a href="javascript://" class="text-gray-900">Sign in</a>
                            </p> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
