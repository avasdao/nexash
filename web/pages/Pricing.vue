<script setup>
useHead({
    title: 'Pricing - Nexa Shell',
    meta: [{
        name: 'description',
        content: 'Pricing for all services.'
    }]
})
</script>

<template>
    <main class="bg-white">
        <section class="bg-white">
            <!-- Pricing with four tiers and toggle -->
            <div class="bg-gradient-to-b from-white to-gray-50">
                <div class="mx-auto max-w-7xl px-6 pt-24 lg:px-8">
                    <div class="sm:align-center sm:flex sm:flex-col">
                        <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-center">
                            Pricing Plans
                        </h1>

                        <!-- <p class="mt-5 text-xl text-gray-500 sm:text-center">
                            Start building for free, then add a site plan to go live.
                            Account plans unlock additional features.
                        </p> -->

                        <section class="relative mx-auto mt-8 max-w-7xl px-6 lg:px-8">
                            <div class="mx-auto max-w-md lg:max-w-4xl">
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
                                            <li>— <strong>50 MB</strong> FREE cloud media &amp; data storage</li>
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

                        <div class="relative mt-6 flex self-center rounded-lg bg-gray-100 p-0.5 sm:mt-8">
                            <button
                                type="button"
                                class="relative w-1/2 whitespace-nowrap rounded-md border-gray-200 bg-white py-2 text-lg font-medium text-gray-900 shadow-sm focus:z-10 focus:outline-none focus:ring-2 focus:ring-purple-500 sm:w-auto sm:px-8"
                            >
                                Monthly Packages
                            </button>

                            <button
                                type="button"
                                class="relative ml-0.5 w-1/2 whitespace-nowrap rounded-md border border-transparent py-2 text-lg font-medium text-gray-700 focus:z-10 focus:outline-none focus:ring-2 focus:ring-purple-500 sm:w-auto sm:px-8"
                            >
                                Pay As You Go
                            </button>
                        </div>
                    </div>

                    <div class="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
                        <div class="divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm">
                            <div class="p-6">
                                <h2 class="text-3xl font-medium leading-6 text-gray-900">
                                    FOSS
                                </h2>

                                <p class="mt-4 text-sm text-gray-500">
                                    Our entire suite of resources and services are available to Free and Open Source Software projects.
                                </p>

                                <p class="mt-8">
                                    <span class="text-4xl font-bold tracking-tight text-gray-900">FREE</span>
                                </p>

                                <a href="javascript://" class="mt-8 block w-full rounded-md border border-transparent bg-purple-600 py-2 text-center text-lg font-semibold text-white hover:bg-purple-700">
                                    Apply for a FOSS Key
                                </a>
                            </div>

                            <div class="px-6 pt-6 pb-8">
                                <h3 class="text-lg font-medium text-gray-900">
                                    What's included
                                </h3>

                                <ul role="list" class="mt-6 space-y-4">
                                    <li class="flex space-x-3">
                                        <!-- Heroicon name: mini/check -->
                                        <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                        </svg>
                                        <span class="text-sm text-gray-500">
                                            All resources provided to <strong>Enterprise</strong> key holders are provided in this exclusive package for qualified <strong>FOSS</strong> projects.
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

                                    <p class="mt-8 flex items-end gap-2">
                                        <span class="text-4xl font-bold tracking-tight text-gray-900">$5</span>
                                        <span class="text-base font-medium text-gray-500">for 30 days</span>
                                    </p>

                                    <a href="javascript://" class="mt-8 block w-full rounded-md border border-transparent bg-purple-600 py-2 text-center text-lg font-semibold text-white hover:bg-purple-700">
                                        Buy dApp Keys
                                    </a>
                                </div>

                                <div class="px-6 pt-6 pb-8">
                                    <h3 class="text-lg font-medium text-gray-900">
                                        What's included
                                    </h3>

                                    <ul role="list" class="mt-6 space-y-4">
                                        <li class="flex space-x-3">
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">
                                                <strong class="text-rose-500">50,000<sup>*</sup></strong> REST requests/day
                                            </span>
                                        </li>

                                        <li class="flex space-x-3">
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">
                                                <strong class="text-rose-500">50,000<sup>*</sup></strong> GraphQL queries/day
                                            </span>
                                        </li>

                                        <li class="flex space-x-3">
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">
                                                <strong class="text-rose-500">60<sup>**</sup></strong> build minutes/month
                                            </span>
                                        </li>

                                        <li class="flex space-x-3">
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">
                                                <strong class="text-rose-500">5GB</strong> data storage
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

                                    <p class="mt-8 flex items-end gap-2">
                                        <span class="text-4xl font-bold tracking-tight text-gray-900">$20</span>
                                        <span class="text-base font-medium text-gray-500">for 30 days</span>
                                    </p>

                                    <a href="javascript://" class="mt-8 block w-full rounded-md border border-transparent bg-purple-600 py-2 text-center text-lg font-semibold text-white hover:bg-purple-700">
                                        Buy Platform Keys
                                    </a>
                                </div>

                                <div class="px-6 pt-6 pb-8">
                                    <h3 class="text-lg font-medium text-gray-900">
                                        What's included
                                    </h3>

                                    <ul role="list" class="mt-6 space-y-4">
                                        <li class="flex space-x-3">
                                            <!-- Heroicon name: mini/check -->
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">
                                                <strong class="text-rose-500">500,000<sup>*</sup></strong> REST requests/day
                                            </span>
                                        </li>

                                        <li class="flex space-x-3">
                                            <!-- Heroicon name: mini/check -->
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">Orci neque eget pellentesque.</span>
                                        </li>

                                        <li class="flex space-x-3">
                                            <!-- Heroicon name: mini/check -->
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">Donec mauris sit in eu tincidunt etiam.</span>
                                        </li>

                                        <li class="flex space-x-3">
                                            <!-- Heroicon name: mini/check -->
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">Faucibus volutpat magna.</span>
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

                                    <p class="mt-8 flex items-end gap-2">
                                        <span class="text-4xl font-bold tracking-tight text-gray-900">
                                            Custom
                                        </span>
                                    </p>

                                    <a href="javascript://" class="mt-8 block w-full rounded-md border border-transparent bg-purple-600 py-2 text-center text-lg font-semibold text-white hover:bg-purple-700">
                                        Request a Quote
                                    </a>
                                </div>

                                <div class="px-6 pt-6 pb-8">
                                    <h3 class="text-lg font-medium text-gray-900">
                                        What's included
                                    </h3>

                                    <ul role="list" class="mt-6 space-y-4">
                                        <li class="flex space-x-3">
                                            <!-- Heroicon name: mini/check -->
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">
                                                <strong class="text-rose-500">Unlimited</strong> REST requests
                                            </span>
                                        </li>

                                        <li class="flex space-x-3">
                                            <!-- Heroicon name: mini/check -->
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">Orci neque eget pellentesque.</span>
                                        </li>

                                        <li class="flex space-x-3">
                                            <!-- Heroicon name: mini/check -->
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">Donec mauris sit in eu tincidunt etiam.</span>
                                        </li>

                                        <li class="flex space-x-3">
                                            <!-- Heroicon name: mini/check -->
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">Faucibus volutpat magna.</span>
                                        </li>

                                        <li class="flex space-x-3">
                                            <!-- Heroicon name: mini/check -->
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">Id sed tellus in varius quisque.</span>
                                        </li>

                                        <li class="flex space-x-3">
                                            <!-- Heroicon name: mini/check -->
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">Risus egestas faucibus.</span>
                                        </li>

                                        <li class="flex space-x-3">
                                            <!-- Heroicon name: mini/check -->
                                            <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm text-gray-500">Risus cursus ullamcorper.</span>
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

            <!-- Logo cloud on brand -->
            <div class="bg-purple-600">
                <div class="mx-auto max-w-7xl py-16 px-6 sm:py-20 lg:px-8">
                    <div class="lg:space-y-10">
                        <h2 class="text-3xl font-bold tracking-tight text-white">The world's most innovative companies use our app</h2>
                        <div class="mt-8 flow-root lg:mt-0">
                            <div class="-mt-4 -ml-8 flex flex-wrap justify-between lg:-ml-4">
                                <div class="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
                                    <img class="h-12" src="https://tailwindui.com/img/logos/tuple-logo-purple-200.svg" alt="Tuple" />
                                </div>

                                <div class="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
                                    <img class="h-12" src="https://tailwindui.com/img/logos/mirage-logo-purple-200.svg" alt="Mirage" />
                                </div>

                                <div class="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
                                    <img class="h-12" src="https://tailwindui.com/img/logos/statickit-logo-purple-200.svg" alt="StaticKit" />
                                </div>

                                <div class="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
                                    <img class="h-12" src="https://tailwindui.com/img/logos/transistor-logo-purple-200.svg" alt="Transistor" />
                                </div>

                                <div class="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
                                    <img class="h-12" src="https://tailwindui.com/img/logos/workcation-logo-purple-200.svg" alt="Workcation" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- FAQ offset -->
            <div class="mx-auto max-w-7xl py-16 px-6 lg:py-20 lg:px-8">
                <div class="lg:grid lg:grid-cols-3 lg:gap-8">
                    <div class="space-y-4">
                        <h2 class="text-3xl font-bold tracking-tight text-gray-900">Frequently asked questions</h2>
                        <p class="text-lg text-gray-500">Can’t find the answer you’re looking for? Reach out to our <a href="javascript://" class="font-medium text-purple-600 hover:text-purple-500">customer support</a> team.</p>
                    </div>
                    <div class="mt-12 lg:col-span-2 lg:mt-0">
                        <dl class="space-y-12">
                            <div>
                                <dt class="text-lg font-medium leading-6 text-gray-900">How do you make holy water?</dt>
                                <dd class="mt-2 text-base text-gray-500">You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.</dd>
                            </div>

                            <div>
                                <dt class="text-lg font-medium leading-6 text-gray-900">What&#039;s the best thing about Switzerland?</dt>
                                <dd class="mt-2 text-base text-gray-500">I don&#039;t know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.</dd>
                            </div>

                            <div>
                                <dt class="text-lg font-medium leading-6 text-gray-900">What do you call someone with no body and no nose?</dt>
                                <dd class="mt-2 text-base text-gray-500">Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.</dd>
                            </div>

                            <div>
                                <dt class="text-lg font-medium leading-6 text-gray-900">Why do you never see elephants hiding in trees?</dt>
                                <dd class="mt-2 text-base text-gray-500">Because they&#039;re so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
