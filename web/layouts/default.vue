<template>
    <!-- <main class="flex flex-col h-screen"> -->
    <main class="">
        <HeaderView />

        <!-- <section class="flex-1 overflow-y-auto"> -->
        <section class="">
            <slot />

            <FooterView />
        </section>
    </main>
</template>
