<script setup>
/* Import modules. */
import moment from 'moment'

/* Set current year. */
const curYear = moment().format('YYYY')

</script>

<template>
    <footer class="bg-gray-900" aria-labelledby="footer-heading">
        <h2 id="footer-heading" class="sr-only">Footer</h2>

        <section class="mx-auto max-w-7xl px-8 py-5">
            <div class="p-3 bg-gray-800 rounded border-2 border-gray-700">
                <h1 class="text-2xl text-gray-100 font-medium">
                    Our Sponsors
                </h1>

                <div class="flex justify-end">
                    <NuxtLink to="/sponsors" class="text-xs text-gray-300 hover:underline hover:text-gray-200">
                        Become our Sponsor?
                    </NuxtLink>
                </div>
            </div>
        </section>

        <div class="mx-auto max-w-7xl px-6 pb-8 pt-8 sm:pt-12 lg:px-8 lg:pt-16">
            <div class="xl:grid xl:grid-cols-3 xl:gap-8">
                <div class="space-y-8">
                    <img class="h-16" src="~/assets/icon.png" alt="NexaShell Logo" />

                    <p class="text-base leading-6 text-gray-300">
                        Reliably delivering the fastest and most affordable cloud data solutions to Nexicans since 2022.
                    </p>

                    <div class="flex space-x-6">
                        <a href="https://twitter.com/AvasDAO" target="_blank" class="text-gray-400 hover:text-gray-500">
                            <span class="sr-only">Twitter</span>
                            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                                />
                            </svg>
                        </a>

                        <a href="https://github.com/avasdao" target="_blank" class="text-gray-400 hover:text-gray-500">
                            <span class="sr-only">GitHub</span>
                            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </a>

                        <a href="https://avasdao.org" target="_blank" class="text-gray-400 hover:text-gray-500">
                            <span class="sr-only">YouTube</span>
                            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </a>
                    </div>
                </div>

                <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                    <div class="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 class="text-base font-semibold leading-6 text-gray-400">
                                Data Solutions
                            </h3>

                            <ul role="list" class="mt-6 space-y-4">
                                <li>
                                    <NuxtLink to="/meta" class="text-base leading-6 text-gray-200 hover:text-gray-400">
                                        Meta Sidechain
                                    </NuxtLink>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-200 hover:text-gray-400">
                                        REST API
                                    </a>
                                </li>

                                <li>
                                    <a href="https://nexa.sh/graphql" target="_blank" class="text-base leading-6 text-gray-200 hover:text-gray-400">
                                        GraphQL Queries
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-200 hover:text-gray-400">
                                        Downloads
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div class="mt-10 md:mt-0">
                            <h3 class="text-base font-semibold leading-6 text-gray-400">
                                Knowledge
                            </h3>

                            <ul role="list" class="mt-6 space-y-4">
                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-200 hover:text-gray-400">
                                        Documentation
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-200 hover:text-gray-400">
                                        Tutorials
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-200 hover:text-gray-400">
                                        Guides
                                    </a>
                                </li>

                                <li>
                                    <NuxtLink to="/pricing" class="text-base leading-6 text-gray-200 hover:text-gray-400">
                                        Pricing
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 class="text-base font-semibold leading-6 text-gray-400">
                                Shell DAO
                            </h3>

                            <ul role="list" class="mt-6 space-y-4">
                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-200 hover:text-gray-400">
                                        Governance
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-200 hover:text-gray-400">
                                        $SHELL Token
                                    </a>
                                </li>

                                <li>
                                    <NuxtLink to="/transparency" class="text-base leading-6 text-gray-200 hover:text-gray-400">
                                        Transparency
                                    </NuxtLink>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-200 hover:text-gray-400">
                                        Voting
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div class="mt-10 md:mt-0">
                            <h3 class="text-base font-semibold leading-6 text-gray-400">
                                Resources
                            </h3>

                            <ul role="list" class="mt-6 space-y-4">
                                <li>
                                    <a href="https://github.com/avasdao/nexash" target="_blank" class="text-base leading-6 text-gray-200 hover:text-gray-400">
                                        View the Source
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-200 hover:text-gray-400">
                                        Privacy
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-200 hover:text-gray-400">
                                        Terms
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-200 hover:text-gray-400">
                                        Code of Conduct
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
                <p class="text-base leading-5 text-gray-500 text-center sm:text-left">
                    &copy; 2022-{{curYear}} NexaShell DAO.
                    <br class="sm:hidden" />All rights reserved.
                </p>
            </div>
        </div>
    </footer>
</template>
