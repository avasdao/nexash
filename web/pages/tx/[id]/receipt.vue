<script setup>
/* Import modules. */
import { jsPDF } from 'jspdf'

useHead({
    title: 'Transaction Receipt by NexaShell',
    meta: [{
        name: 'description',
        content: 'Transaction Receipt'
    }]
})

const route = useRoute()

console.log('ROUTE PARAMS', route.params)

const id = route.params.id

const openDoc = () => {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        // format: 'a4',
        format: 'letter',
        putOnlyUsedFonts: true,
        floatPrecision: 16, // or "smart", default is 16
    })

    doc.setDocumentProperties({
        title: 'Tx Receipt',
        name: 'tx-receipt.pdf',
        filename: 'tx-receipt.pdf',
        subject: 'Transaction Receipt',
        author: "NexaShell developers",
        keywords: 'nexa, receipt',
        creator: "NEXA.sh",
    })

    doc.text(`Transaction Receipt`, 10, 10)

    window.open(URL.createObjectURL(doc.output('blob', 'tx-receipt.pdf')))

    // const dataUri = doc.output('datauristring')
    // const embed = `<embed width='100%' height='100%' src='${dataUri}'/>`
    // const docWin = window.open()
    // docWin.document.open()
    // docWin.document.write(embed)
    // docWin.document.close()
}

onMounted(() => {
    console.log('Mounted!')
    // openDoc()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="max-w-5xl mx-auto px-3 py-10 flex flex-col gap-3">
        <h1 class="text-4xl text-gray-700 font-medium">
            Transaction Receipt
        </h1>

        <span class="block text-lg text-gray-500 font-medium truncate">
            {{id}}
        </span>

        <p class="text-gray-800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel reprehenderit at omnis alias minima ut quaerat tempore velit deserunt quia quisquam maxime, ipsam sequi? Vero animi explicabo obcaecati voluptatem alias.
        </p>

        <Button @click="openDoc" target="_blank" class="w-fit px-3 py-1 text-xl font-medium text-blue-500 bg-blue-100 border-2 border-blue-300 rounded-lg shadow hover:bg-blue-200">
            Open PDF Receipt
        </Button>

        <div class="w-1/2 p-3 text-sm">
            Please choose your preferred format:

            <div class="grid grid-cols-2">
                <button>US Letter</button>
                <button>Universal A4</button>
            </div>
        </div>
    </main>
</template>
