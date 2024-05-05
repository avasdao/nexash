<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="mx-auto max-w-7xl py-16 px-6 lg:py-20 lg:px-8">
        <div class="lg:grid lg:grid-cols-3 lg:gap-8">
            <div class="space-y-4">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900">
                    Frequently asked questions
                </h2>

                <p class="text-lg text-gray-500">
                    Can’t find the answer you’re looking for?
                    Reach out to our <a href="support@avasdao.org" class="font-medium text-purple-600 hover:text-purple-500">customer support</a> team.
                </p>
            </div>

            <div class="mt-12 lg:col-span-2 lg:mt-0">
                <dl class="space-y-12">
                    <div>
                        <dt class="text-lg font-medium leading-6 text-gray-900">
                            What is a Compute Unit (CU)?
                        </dt>

                        <dd class="mt-2 text-base text-gray-500">
                            A compute unit is a measure of the requests needed to query computationally expensive API endpoints.
                            Each request has both CU Weight and Archive CU Weight that are measured in terms of compute units.
                        </dd>
                    </div>

                    <div>
                        <dt class="text-lg font-medium leading-6 text-gray-900">
                            Why do I need Compute Units (CUs)?
                        </dt>

                        <dd class="mt-2 text-base text-gray-500">
                            Some requests are more expensive than others.
                            By giving some heavy requests higher weight, we ensure that you only pay for what you use and not a cent more.
                        </dd>
                    </div>

                </dl>
            </div>
        </div>
    </main>
</template>
