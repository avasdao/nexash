<script setup>
useHead({
    title: 'Pricing - NexaShell',
    meta: [{
        name: 'description',
        content: 'Pricing for all services.'
    }]
})

const DAPP_BASE_RATE = 15
const PLATFORM_BASE_RATE = 60

const stakeline = ref('0')

const displayMonths = computed(() => {
    if (stakeline.value === '0') {
        return '30 Days'
    }
    else if (stakeline.value === '12') {
        return '1 Year'
    }
    else {
        return `${stakeline.value} Months`
    }
})

const displayDappRate = computed(() => {
    if (stakeline.value === '0') {
        return DAPP_BASE_RATE * 10
    }
    else if (stakeline.value === '3') {
        return DAPP_BASE_RATE * 7.5
    }
    else if (stakeline.value === '6') {
        return DAPP_BASE_RATE * 5
    }
    else if (stakeline.value === '9') {
        return DAPP_BASE_RATE * 2.5
    }
    else if (stakeline.value === '12') {
        return DAPP_BASE_RATE
    }
})

const displayPlatformRate = computed(() => {
    if (stakeline.value === '0') {
        return PLATFORM_BASE_RATE * 10
    }
    else if (stakeline.value === '3') {
        return PLATFORM_BASE_RATE * 7.5
    }
    else if (stakeline.value === '6') {
        return PLATFORM_BASE_RATE * 5
    }
    else if (stakeline.value === '9') {
        return PLATFORM_BASE_RATE * 2.5
    }
    else if (stakeline.value === '12') {
        return PLATFORM_BASE_RATE
    }
})
</script>

<template>
    <main class="bg-white">
        <div class="bg-white">
            <!-- Pricing with four tiers and toggle -->
            <div class="bg-gradient-to-b from-white to-gray-50">
                <div class="flex flex-col items-center mx-auto max-w-7xl px-6 pt-24 lg:px-8">
                    <div class="sm:align-center sm:flex sm:flex-col">
                        <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-center">
                            Pricing Plans
                        </h1>

                        <!-- <p class="mt-5 text-xl text-gray-500 sm:text-center">
                            Start building for free, then add a site plan to go live.
                            Account plans unlock additional features.
                        </p> -->

                        <section class="relative mx-auto mt-8 max-w-7xl px-6 lg:px-8">
                            <div class="mx-auto lg:max-w-4xl">
                                <div class="bg-yellow-100 border-2 border-yellow-300 flex flex-col gap-6 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 lg:flex-row lg:items-center lg:gap-8">
                                    <div class="lg:min-w-0 lg:flex-1">
                                        <h3 class="text-4xl font-semibold leading-8 tracking-tight text-indigo-600">
                                            100% <span class="text-5xl">FREE</span> For BUIDLers, <span class="text-5xl">FOREVER!</span>
                                        </h3>

                                        <div class="mt-2 text-base leading-7 text-gray-600">
                                            Just point your dApp to one of our <a href="https://docs.nexa.sh" target="_blank" class="text-blue-500 font-medium hover:underline">Endpoints</a> and you're all set!
                                        </div>

                                        <ul class="ml-10 mt-3">
                                            <li>— up to <strong>10,000 REST</strong> requests per day</li>
                                            <li>— up to <strong>10,000 GraphQL</strong> queries per day</li>
                                            <li>— up to <strong>3</strong> requests per second</li>
                                            <!-- <li>— <strong>50 MB</strong> FREE cloud media &amp; data storage</li> -->
                                            <li>— Real-time data analytics</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <a href="https://docs.nexa.sh" target="_blank" class="inline-block rounded-lg border-2 border-indigo-300 bg-indigo-50 px-4 py-2.5 text-center text-xl font-semibold leading-5 text-indigo-700 hover:bg-indigo-100">
                                            Read the Docs <span aria-hidden="true">&rarr;</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <section class="max-w-2xl w-full mt-10">
                        <div class="px-5 py-2 flex flex-col items-center bg-gray-700 border-2 border-amber-300 shadow rounded-2xl">
                            <h2 class="pl-3 text-base font-medium text-amber-200 uppercase tracking-widest">
                                Set Your Stakeline
                            </h2>

                            <input
                                type="range"
                                min="0"
                                max="12"
                                step="3"
                                class="my-2 px-3 w-full h-8 bg-gray-200 rounded-2xl appearance-none cursor-pointer range-lg dark:bg-amber-400"
                                v-model="stakeline"
                            />

                            <h2 class="pl-3 text-2xl font-medium text-amber-200 uppercase tracking-widest">
                                {{displayMonths}}
                            </h2>
                        </div>

                        <div class="pl-5 text-sm text-rose-500 italic tracking-wider">
                            <h4 class="text-center">
                                NOTE: The <span class="font-medium">LONGER</span> your stakeline, the <span class="font-medium">LESS</span> assets required for Plan activation.
                            </h4>
                        </div>
                    </section>

                    <div class="mt-6 space-y-4 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
                        <div class="divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm">
                            <div class="p-6">
                                <h2 class="text-3xl font-medium leading-6 text-gray-900">
                                    Nexican
                                </h2>

                                <p class="mt-4 text-sm text-gray-500">
                                    Our entire suite of resources and services are available to Free and Open Source Software projects.
                                </p>

                                <p class="mt-8 flex flex-col items-end gap-2">
                                    <span class="text-4xl font-bold tracking-tight text-gray-900">
                                        FREE
                                    </span>

                                    <span class="text-base font-medium text-gray-500">
                                        Premium FOREVER
                                    </span>
                                </p>

                                <a href="javascript://" class="mt-8 block w-full rounded-md border border-transparent bg-purple-600 py-2 text-center text-lg font-semibold text-white hover:bg-purple-700">
                                    NFT Registration
                                </a>
                            </div>

                            <div class="px-6 pt-6 pb-8">
                                <h3 class="text-base font-medium text-gray-900">
                                    What's included
                                </h3>

                                <ul role="list" class="mt-6 space-y-4">
                                    <li class="flex space-x-3">
                                        <!-- Heroicon name: mini/check -->
                                        <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                        </svg>
                                        <span class="text-sm text-gray-500">
                                            All resources provided in the <strong>dApp</strong> Plan are provided in this exclusive package for ALL <strong>Nexican Builders</strong>.
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="flex flex-col justify-between rounded-lg border border-gray-200 shadow-sm">
                            <div class="divide-y divide-gray-200">
                                <div class="p-6">
                                    <h2 class="text-3xl font-medium leading-6 text-gray-900">
                                        dApp
                                    </h2>

                                    <p class="mt-4 text-sm text-gray-500">
                                        Everything your team will need to launch and support the MVP of your first Nexa dApp.
                                    </p>

                                    <p class="mt-8 flex flex-col items-end gap-2">
                                        <span class="text-4xl font-bold tracking-tight text-gray-900">
                                            {{displayDappRate}} $AVAS
                                        </span>

                                        <span class="text-base font-medium text-gray-500">
                                            Premium for {{displayMonths}}
                                        </span>
                                    </p>

                                    <a href="javascript://" class="mt-8 block w-full rounded-md border border-transparent bg-purple-600 py-2 text-center text-lg font-semibold text-white hover:bg-purple-700">
                                        Active Stakeline
                                    </a>
                                </div>

                                <div class="px-6 pt-6 pb-8">
                                    <h3 class="text-base font-medium text-gray-900">
                                        What's included
                                    </h3>

                                    <ul role="list" class="mt-6 space-y-4">
                                        <!-- <li class="flex space-x-3">
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">
                                                <strong class="text-rose-500">50,000<sup>*</sup></strong> REST requests/day
                                            </span>
                                        </li> -->

                                        <li class="flex space-x-3">
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">
                                                <strong class="text-rose-500">50,000<sup>*</sup></strong> Compute Units per day
                                            </span>
                                        </li>

                                        <li class="flex space-x-3">
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">
                                                <strong class="text-rose-500">60<sup>**</sup></strong> build minutes per month
                                            </span>
                                        </li>

                                        <li class="flex space-x-3">
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">
                                                Real-time Monitoring and Reporting for <strong class="text-rose-500">1</strong> dApp
                                            </span>
                                        </li>

                                        <li class="flex space-x-3">
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">
                                                Customer Support response within <strong class="text-rose-500">24</strong> hours
                                            </span>
                                        </li>

                                    </ul>
                                </div>
                            </div>

                            <div class="p-3 text-xs text-right text-gray-500 italic">
                                <span class="block">* up to <strong class="text-rose-500">10</strong> requests per second</span>
                                <span class="block">** up to <strong class="text-rose-500">1</strong> running VM at a time</span>
                            </div>
                        </div>

                        <div class="flex flex-col justify-between rounded-lg border border-gray-200 shadow-sm">
                            <div class="divide-y divide-gray-200">
                                <div class="p-6">
                                    <h2 class="text-3xl font-medium leading-6 text-gray-900">
                                        Platform
                                    </h2>

                                    <p class="mt-4 text-sm text-gray-500">
                                        When it's time to scale, we've got your covered 100% with elastic resources at your disposal.
                                    </p>

                                    <p class="mt-8 flex flex-col items-end gap-2">
                                        <span class="text-4xl font-bold tracking-tight text-gray-900">
                                            {{displayPlatformRate}} $AVAS
                                        </span>

                                        <span class="text-base font-medium text-gray-500">
                                            Premium for {{displayMonths}}
                                        </span>
                                    </p>

                                    <a href="javascript://" class="mt-8 block w-full rounded-md border border-transparent bg-purple-600 py-2 text-center text-lg font-semibold text-white hover:bg-purple-700">
                                        Activate Stakeline
                                    </a>
                                </div>

                                <div class="px-6 pt-6 pb-8">
                                    <h3 class="text-base font-medium text-gray-900">
                                        Everything in dApp, plus:
                                    </h3>

                                    <ul role="list" class="mt-6 space-y-4">
                                        <!-- <li class="flex space-x-3">
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">
                                                <strong class="text-rose-500">500,000<sup>*</sup></strong> REST requests/day
                                            </span>
                                        </li> -->

                                        <li class="flex space-x-3">
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">
                                                <strong class="text-rose-500">15 million<sup>*</sup></strong> Compute Units per month
                                            </span>
                                        </li>

                                        <li class="flex space-x-3">
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">
                                                <strong class="text-rose-500">10<sup>**</sup></strong> build hours per month
                                            </span>
                                        </li>

                                    </ul>
                                </div>
                            </div>

                            <div class="p-3 text-xs text-right text-gray-500 italic">
                                <span class="block">* up to <strong class="text-rose-500">50</strong> requests per second</span>
                                <span class="block">** up to <strong class="text-rose-500">3</strong> running VMs at a time</span>
                            </div>
                        </div>

                        <div class="flex flex-col justify-between rounded-lg border border-gray-200 shadow-sm">
                            <div class="divide-y divide-gray-200">
                                <div class="p-6">
                                    <h2 class="text-3xl font-medium leading-6 text-gray-900">
                                        Enterprise
                                    </h2>

                                    <p class="mt-4 text-sm text-gray-500">
                                        When your application becomes the next BIG sensation, we're ready to deliver the bandwidth you'll need.
                                    </p>

                                    <p class="mt-8 flex flex-col items-end gap-2">
                                        <span class="text-4xl font-bold tracking-tight text-gray-900">
                                            Custom
                                        </span>

                                        <span class="text-base font-medium text-gray-500">
                                            24x7 Uptime + Support
                                        </span>
                                    </p>

                                    <a href="javascript://" class="mt-8 block w-full rounded-md border border-transparent bg-purple-600 py-2 text-center text-lg font-semibold text-white hover:bg-purple-700">
                                        Request a Quote
                                    </a>
                                </div>

                                <div class="px-6 pt-6 pb-8">
                                    <h3 class="text-base font-medium text-gray-900">
                                        Everything in Platform, plus:
                                    </h3>

                                    <ul role="list" class="mt-6 space-y-4">
                                        <!-- <li class="flex space-x-3">
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">
                                                <strong class="text-rose-500">Unlimited</strong> REST requests
                                            </span>
                                        </li> -->

                                        <li class="flex space-x-3">
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">
                                                <strong class="text-rose-500">Unlimited<sup>*</sup></strong> Compute Units per month
                                            </span>
                                        </li>

                                        <li class="flex space-x-3">
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">
                                                <strong class="text-rose-500">Unlimited<sup>**</sup></strong> build time per month
                                            </span>
                                        </li>

                                    </ul>
                                </div>
                            </div>

                            <div class="p-3 text-xs text-right text-gray-500 italic">
                                <span class="block"><strong class="text-rose-500">unlimited</strong> requests per second</span>
                                <span class="block"><strong class="text-rose-500">unlimited</strong> running VMs at a time</span>
                            </div>
                        </div>
                    </div>

                </div>

                <PricingPremiumBenefits />
            </div>

            <PricingLogoCloud />

            <PricingFAQ />
        </div>
    </main>
</template>
