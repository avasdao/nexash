'use strict'

const express = require('express')
const cors = require('cors')

/* Set constants. */
const HOST = '0.0.0.0'
const PORT = process.env.PORT || 4000

/* Initialize application. */
const app = express()

/* Initialize CORS. */
app.use(cors())

/* Initialize JSON parser. */
app.use(express.json())

/* Initialize URL parser. */
app.use(express.urlencoded({ extended: true }))

/* Initialize public folder. */
app.use(express.static('public'))

/* Initialize Administration route. */
app.post('/v1/admin', require('./routes/admin'))

/* Initialize Core (Node) route. */
app.post('/v1/core', require('./routes/core'))

// TODO: Offer help.
app.get('/v1', (req, res) => {
    res.end('Oops! I think you forgot something.')
})

/* Start listening for connections. */
app.listen(PORT, HOST)

/* Display current environment variables. */
console.info()
console.log(`Running on http://${HOST}:${PORT}`)
console.info()
console.info('Current Environment Variables')
console.info('-----------------------------')
console.info('  - NODE_ENV       :', process.env.NODE_ENV)
console.info('  - COUCHDB_AUTH   :', process.env.COUCHDB_AUTH)
console.info('  - SMTP_HOST      :', process.env.SMTP_HOST)
console.info('  - SMTP_USER      :', process.env.SMTP_USER)
console.info('  - SMTP_PASS      :', process.env.SMTP_PASS)
console.info()
