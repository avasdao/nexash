<script setup>
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
            <div class="mt-10 px-3 lg:px-0 grid grid-cols-1 lg:grid-cols-5 gap-8">
                <section class="col-span-1 lg:col-span-3 flex flex-col gap-4">
                    <SearchHero />

                    <FeaturedStats />
                </section>

                <section class="col-span-1 lg:col-span-2 h-32 lg:h-full flex bg-sky-100 border-2 border-sky-400 justify-center items-center rounded-lg">
                    <h4 class="text-sm text-sky-600 font-light">[ YOUR AD GOES HERE ]</h4>
                </section>
            </div>

            <ClientOnly fallback-tag="span" fallback="Loading transactions...">
                <div class="mt-5 flex flex-col gap-4">
                    <div class="px-3 py-5 lg:px-0">
                        <BlockSlideshow />
                    </div>

                    <div class="px-3 lg:px-0 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <TransactionSlideshow />

                        <TokenSlideshow />
                    </div>
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
                        <span class="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Ready to #BUIDL?
                        </span>

                        <span class="-mb-1 block pb-1 text-gray-700">
                            Read the docs, then start a project!
                        </span>
                    </h2>

                    <div class="mt-6 space-y-4 sm:flex sm:space-y-0 sm:space-x-5">
                        <NuxtLink
                            to="https://docs.nexa.sh/" target="_blank"
                            class="flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-3 text-xl font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                        >
                            Read the Docs
                        </NuxtLink>

                        <NuxtLink to="https://nexa.studio" target="_blank" class="flex items-center justify-center rounded-md border border-transparent bg-indigo-50 px-4 py-3 text-xl font-medium text-indigo-800 shadow-sm hover:bg-indigo-100">
                            Start a Project
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </main>
    </main>
</template>
