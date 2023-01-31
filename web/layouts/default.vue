<template>
    <main class="flex flex-col h-screen">
        <HeaderView />

        <section class="flex-1 overflow-y-auto">
            <slot />

            <FooterView />
        </section>
    </main>
</template>
