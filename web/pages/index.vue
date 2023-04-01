<script setup>
/* Import modules. */
import { createClient } from 'graphql-ws'
import { ref } from 'vue'

useHead({
    title: 'NexaShell - Data Query',
    meta: [{
        name: 'description',
        content: 'Direct access to ALL the Nexa data that you need.'
    }]
})

</script>

<template>
    <main class="bg-white">
        <main class="max-w-7xl mx-auto">
            <SearchView />

            <!-- <HeroView /> -->

            <ClientOnly fallback-tag="span" fallback="Loading transactions...">
                <div class="mt-5 px-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <TransactionsView />

                    <BlocksView />
                </div>
            </ClientOnly>

            <!-- <Sponsors /> -->

            <!-- Alternating Feature Sections -->
            <!-- <div class="relative overflow-hidden pt-16 pb-32">
                <div aria-hidden="true" class="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"></div>

                <BenefitsView />

                <BuildersView />

            </div> -->

            <!-- <BenefitsList /> -->

            <!-- <MetricsView /> -->

            <!-- CTA Section -->
            <div class="bg-white">
                <div class="mx-auto max-w-4xl py-16 px-6 sm:py-24 lg:flex lg:max-w-7xl lg:items-center lg:justify-between lg:px-8">
                    <h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        <span class="block">Ready to get started?</span>
                        <span class="-mb-1 block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text pb-1 text-transparent">Get in touch or create an account.</span>
                    </h2>
                    <div class="mt-6 space-y-4 sm:flex sm:space-y-0 sm:space-x-5">
                        <a
                            href="javascript://"
                            class="flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-3 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                        >
                            Learn more
                        </a>
                        <a href="javascript://" class="flex items-center justify-center rounded-md border border-transparent bg-indigo-50 px-4 py-3 text-base font-medium text-indigo-800 shadow-sm hover:bg-indigo-100">Get started</a>
                    </div>
                </div>
            </div>
        </main>
    </main>
</template>
