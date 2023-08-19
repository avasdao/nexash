<script setup>
useHead({
    title: 'Contracts - NexaShell',
    meta: [{
        name: 'description',
        content: 'Contracts'
    }]
})

const contracts = ref(null)

const isShowingMenu = ref(false)

const loadContracts = async () => {
    contracts.value.push({
        id: '1',
        name: `HodlVault`,
        iconUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
        bgUrl: 'https://images.unsplash.com/photo-1570912355338-cdb934b76b12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=437&q=80'
    })

    contracts.value.push({
        id: '2',
        name: `Transfer With Timeout`,
        iconUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
    })

    contracts.value.push({
        id: '3',
        name: `Licho's Mecenas`,
        iconUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
    })

    contracts.value.push({
        id: '4',
        name: `Memo.cash Announcement`,
        iconUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
    })
}


const init = async () => {
    contracts.value = []

    await loadContracts()
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
    <main class="px-3 py-5 max-w-7xl mx-auto">
        <h1 class="text-4xl font-medium">
            <em class="text-rose-400">Wise</em>
            <span class="ml-0 sm:ml-2 block sm:inline text-5xl sm:text-4xl">Contracts</span>
        </h1>

        <p class="my-5 w-full w-1/2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia labore exercitationem esse quis nihil quaerat eveniet, eaque necessitatibus dolorum vel maiores iste inventore ratione deserunt. Repellendus culpa dolores voluptas sit?
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-3">
            <div class="flex flex-col gap-3 pr-5">
                <h2 class="text-xl font-medium">
                    Contract Search
                </h2>

                <input
                    type="text"
                    placeholder="Search by name or purpose"
                    class="px-3 py-1 w-full text-lg bg-amber-100 border-2 border-amber-300 rounded-lg shadow"
                />

                <p class="text-gray-600 text-sm">
                    0xcdcd77c0:
                    the Contract ID is derived as the first 4 bytes of the HASH160 (SHA-265 + RIPEMD-160) of the HEX form of the contract's raw bytes.
                    NOTE: This is what is saved on-chain.
                </p>

                <div class="mx-5 border-t border-gray-300" />

                <h3 class="text-xl font-medium">
                    Category Filter
                </h3>

                <ul class="list-disc pl-10">
                    <li>
                        Identity Tokens
                    </li>
                </ul>
            </div>

            <section class="col-span-2">
                <div class="mx-5 my-2 w-fit flex flex-row justify-between gap-16">
                    <div class="w-fit flex flex-col items-center gap-1">
                        <button type="button" class="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" role="switch" aria-checked="false">
                            <span class="sr-only">Use setting</span>
                            <span aria-hidden="true" class="pointer-events-none absolute h-full w-full rounded-md bg-white"></span>
                            <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
                            <span aria-hidden="true" class="bg-gray-200 pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"></span>
                            <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                            <span aria-hidden="true" class="translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"></span>
                        </button>

                        <h4 class="text-sm text-gray-500 line-through">
                            Nexscript
                        </h4>
                    </div>

                    <div class="w-fit flex flex-col items-center gap-1">
                        <button type="button" class="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" role="switch" aria-checked="false">
                            <span class="sr-only">Use setting</span>
                            <span aria-hidden="true" class="pointer-events-none absolute h-full w-full rounded-md bg-white"></span>
                            <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
                            <span aria-hidden="true" class="bg-gray-200 pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"></span>
                            <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                            <span aria-hidden="true" class="translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"></span>
                        </button>

                        <h4 class="text-sm text-gray-500 line-through">
                            Solidity
                        </h4>
                    </div>

                    <div class="w-fit flex flex-col items-center gap-1">
                        <button type="button" class="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" role="switch" aria-checked="false">
                            <span class="sr-only">Use setting</span>
                            <span aria-hidden="true" class="pointer-events-none absolute h-full w-full rounded-md bg-white"></span>
                            <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
                            <span aria-hidden="true" class="bg-gray-200 pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"></span>
                            <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                            <span aria-hidden="true" class="translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"></span>
                        </button>

                        <h4 class="text-sm text-gray-500 line-through">
                            Raw OPs
                        </h4>
                    </div>
                </div>

                <ul role="list" class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 xl:gap-x-8">

                    <li v-for="contract of contracts" :key="contract.id" class="overflow-hidden rounded-xl border border-gray-200">
                        <div class="relative flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                            <img
                                :src="contract.bgUrl"
                                class="-ml-6 absolute w-full h-full object-cover"
                            />

                            <div class="-ml-6 absolute w-full h-full bg-gray-900 opacity-60" />

                            <img
                                :src="contract.iconUrl"
                                alt="Tuple"
                                class="z-10 h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                            />

                            <div class="z-10 font-medium leading-6 text-gray-100">
                                <h3 class="text-xl">
                                    {{contract.name}}
                                </h3>

                                <div class="w-fit rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-indigo-700 bg-indigo-50 ring-indigo-600/10">
                                    Covenant
                                </div>
                            </div>

                            <div class="z-10 relative ml-auto">
                                <button type="button" class="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500" id="options-menu-0-button" aria-expanded="false" aria-haspopup="true">
                                    <span class="sr-only">Open options</span>
                                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                                    </svg>
                                </button>

                                <!--
                        Dropdown menu, show/hide based on menu state.

                        Entering: "transition ease-out duration-100"
                            From: "transform opacity-0 scale-95"
                            To: "transform opacity-100 scale-100"
                        Leaving: "transition ease-in duration-75"
                            From: "transform opacity-100 scale-100"
                            To: "transform opacity-0 scale-95"
                        -->
                                <div
                                    v-if="isShowingMenu"
                                    class="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="options-menu-0-button"
                                    tabindex="-1"
                                >
                                    <!-- Active: "bg-gray-50", Not Active: "" -->
                                    <a href="javascript://" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem" tabindex="-1" id="options-menu-0-item-0">
                                        View details
                                    </a>

                                    <a href="javascript://" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem" tabindex="-1" id="options-menu-0-item-1">
                                        Edit
                                    </a>

                                    <a href="javascript://" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem" tabindex="-1" id="options-menu-0-item-1">
                                        Play script
                                    </a>
                                </div>
                            </div>
                        </div>

                        <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                            <div class="flex justify-between gap-x-4 py-3">
                                <dt class="text-gray-500">
                                    Last activity
                                </dt>

                                <dd class="text-gray-700">
                                    <time datetime="2022-12-13">
                                        8 minutes ago
                                    </time>
                                </dd>
                            </div>

                            <div class="flex justify-between gap-x-4 py-3">
                                <dt class="text-gray-500">
                                    Amount
                                </dt>

                                <dd class="flex items-start gap-x-2">
                                    <div class="font-medium text-gray-900">
                                        $2,000.00
                                    </div>

                                    <div class="rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/10">
                                        Verified
                                    </div>
                                </dd>
                            </div>
                        </dl>
                    </li>
                </ul>
            </section>
        </div>
    </main>
</template>
