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
                            How do you make holy water?
                        </dt>

                        <dd class="mt-2 text-base text-gray-500">
                            You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.
                        </dd>
                    </div>

                    <div>
                        <dt class="text-lg font-medium leading-6 text-gray-900">
                            What&#039;s the best thing about Switzerland?
                        </dt>

                        <dd class="mt-2 text-base text-gray-500">
                            I don&#039;t know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.
                        </dd>
                    </div>

                    <div>
                        <dt class="text-lg font-medium leading-6 text-gray-900">
                            What do you call someone with no body and no nose?
                        </dt>

                        <dd class="mt-2 text-base text-gray-500">
                            Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.
                        </dd>
                    </div>

                    <div>
                        <dt class="text-lg font-medium leading-6 text-gray-900">
                            Why do you never see elephants hiding in trees?
                        </dt>

                        <dd class="mt-2 text-base text-gray-500">
                            Because they&#039;re so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </main>
</template>
