/* Import modules. */
import { resolve } from 'path'

/* Build configuration. */
const config = {
    bundler: 'webpack',
    input: resolve(__dirname, 'src/index.js'),
    server: {
        port: 8080,
    },
    polyfills: true,
    // experimental: {
    //     wasm: true
    // },
}

/* Export configuration. */
export default config
