/* Import modules. */
import cluster from 'cluster'
import os from 'os'

if (cluster.isPrimary) {
    // Count the machine's CPUs
    const cpuCount = os.cpus().length

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork()
    }

    // Listen for dying workers
    cluster.on('exit', function () {
        cluster.fork()
    })
} else {
    require('/webapp/.output/server/index.mjs')
}
