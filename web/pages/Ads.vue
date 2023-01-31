<script setup>
useHead({
    title: 'Platform Advertising - Nexa Shell',
    meta: [{
        name: 'description',
        content: 'Platform Advertising'
    }]
})
</script>

<template>
    <main class="">
        <HeaderView />

        <main class="max-w-7xl mx-auto">
            <h1 class="text-4xl font-medium">
                Platform Advertising
            </h1>

            <p>
                Each week (starting on Monday @ 00:00 UTC), the TOP 10 "approved" advertisements (by bid price) begin rotation on the homepage and platform footer.
            </p>

            <p>
                Bidders pay the lowest (10th bidder) price for their ads to run for the week.
            </p>
        </main>

        <section>
            <h2>Requirements</h2>

            <ul>
                <li>No profanity</li>
                <li>Non competitive</li>
            </ul>
        </section>

        <FooterView />
    </main>
</template>
