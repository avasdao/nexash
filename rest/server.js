import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'

import adminRoute from './routes/admin.js'
import blockRoute from './routes/block.js'
import coreRoute from './routes/core.js'

/* Set constants. */
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3000

/* Initialize application. */
const app = express()

/* Initialize CORS. */
app.use(cors())

/* Set rate limits. */
const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // NOTE: Default is 2 minutes.
	max: 250, // NOTE: We limit each IP to 250 requests per 2 minute window.
	standardHeaders: true, // NOTE: Return rate limit info in the `RateLimit-*` headers.
	legacyHeaders: false, // NOTE: Disable the `X-RateLimit-*` headers.
})

/* Apply the rate limiting middleware to all requests. */
app.use(limiter)

app.set('trust proxy', 3) // NOTE: 0 is localhost, 1,2 are Cloudflare
app.get('/v1/ip', (request, response) => response.send(request.ip))

/* Initialize JSON parser. */
app.use(express.json())

/* Initialize URL parser. */
app.use(express.urlencoded({ extended: true }))

/* Initialize public folder. */
app.use('/v1', express.static('public'))

/* Initialize Administration route. */
app.post('/v1/admin', adminRoute)

/* Initialize Block route. */
app.get('/v1/block', blockRoute)
app.get('/v1/block/:height', blockRoute)

/* Initialize Core (Node) route. */
app.post('/v1/core', coreRoute)

/* Set Oops! */
const OOPS = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Oops!</title>
</head>

<body>

<h3>Oops! I think you made a wrong turn.</h3>

<a href="https://nexa.sh/v1"><h3>Go to API documentation</h3></a>

</body>
</html>
`
// TODO: Offer help.
app.get('*', (req, res) => {
    res.end(OOPS)
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
