<script setup>
/* Import modules. */
import numeral from 'numeral'
import { ref } from 'vue'

const isShowingSolutionsMenu = ref(false)
const isShowingMobileMenu = ref(false)

const TICKER_UPDATE_INTERVAL = 30000 // default: 30 seconds

/* Initialize NEX/USD holder. */
const nexUsd = ref(null)

const ENDPOINT = 'https://www.exbitron.com/api/v2/peatio/public/markets/nexausdt/tickers'

const updateTicker = async () => {
    const response = await $fetch(ENDPOINT)
        .catch(err => console.error)

    const ticker = response.ticker

    const last = ticker.last * 1000000.0

    nexUsd.value = numeral(last).format('$0,0.00[00]')
}

updateTicker()

setInterval(updateTicker, TICKER_UPDATE_INTERVAL)
</script>

<template>
    <header class="hidden md:flex flex-col">
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

                <button>
                    Blocks
                </button>

                <button>
                    Transactions
                </button>

                <button>
                    Assets
                </button>

                <button>
                    DeFi
                </button>

                <button>
                    Contracts
                </button>
            </nav>

        </section>

        <section class="bg-gradient-to-r from-gray-100 to-gray-200">
            <div class="py-1 max-w-7xl mx-auto flex justify-end">
                <h3 class="text-sm">$ Price: {{nexUsd}}</h3>
            </div>
        </section>
    </header>

    <header class="md:hidden">
        <div class="relative bg-white">
            <div class="mx-auto flex max-w-7xl items-center justify-between p-6 md:justify-start md:space-x-10 lg:px-8">
                <div class="flex justify-start lg:w-0 lg:flex-1">
                    <NuxtLink to="/">
                        <span class="sr-only">NexaShell</span>
                        <img class="h-12 w-auto md:h-16" src="~/assets/icon.png" alt="" />
                    </NuxtLink>
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
                                <a href="javascript://" class="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50">
                                    <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                                        <!-- Heroicon name: outline/inbox -->
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                                            />
                                        </svg>
                                    </div>
                                    <div class="ml-4 text-base font-medium text-gray-900">Inbox</div>
                                </a>

                                <a href="javascript://" class="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50">
                                    <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                                        <!-- Heroicon name: outline/chat-bubble-bottom-center-text -->
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                                            />
                                        </svg>
                                    </div>
                                    <div class="ml-4 text-base font-medium text-gray-900">Messaging</div>
                                </a>

                                <NuxtLink to="/transparency" class="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50">
                                    <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                                        <!-- Heroicon name: outline/chat-bubble-left-right -->
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                            />
                                        </svg>
                                    </div>

                                    <div class="ml-4 text-base font-medium text-gray-900">
                                        Transparency
                                    </div>
                                </NuxtLink>

                                <a href="javascript://" class="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50">
                                    <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                                        <!-- Heroicon name: outline/question-mark-circle -->
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                                            />
                                        </svg>
                                    </div>
                                    <div class="ml-4 text-base font-medium text-gray-900">Knowledge Base</div>
                                </a>
                            </nav>
                        </div>
                    </div>
                    <div class="py-6 px-5">
                        <div class="grid grid-cols-2 gap-4">
                            <a href="javascript://" class="text-base font-medium text-gray-900 hover:text-gray-700">Pricing</a>
                            <a href="javascript://" class="text-base font-medium text-gray-900 hover:text-gray-700">Partners</a>
                            <a href="javascript://" class="text-base font-medium text-gray-900 hover:text-gray-700">Company</a>
                        </div>
                        <div class="mt-6">
                            <a
                                href="javascript://"
                                class="flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                            >
                                Sign up
                            </a>
                            <p class="mt-6 text-center text-base font-medium text-gray-500">
                                Existing customer?
                                <a href="javascript://" class="text-gray-900">Sign in</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
