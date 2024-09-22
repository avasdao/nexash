/* Import modules. */
import Net from 'net'
import { v4 as uuidv4 } from 'uuid'

/* Initialize constants. */
const RECONNECTION_DELAY = 100
const ROSTRUM_HOST = '127.0.0.1'
const ROSTRUM_PORT = 20001

/* Initialize requests handler. */
const requests = {}

/* Initialize client. */
const client = new Net.Socket()

/**
 * Make Request
 *
 * Make a data request to a local Rostrum server.
 */
const makeRequest = (_method, _params) => {
    const id = uuidv4()
    console.log('REQUEST ID', id)

    /* Initialize handlers. */
    let resolve
    let reject

    /* Return promise (to caller). */
    const request = new Promise((_resolve, _reject) => {
        resolve = _resolve
        reject = _reject
    })

    /* Add request to handler. */
    requests[id] = { resolve, reject }

    /* Build JSON. */
    const json = {
        id,
        method: _method,
        params: _params,
    }
    console.log('JSON', json)

    try {
        /* Write to client. */
        client.write(`${JSON.stringify(json)}\n`)
    } catch (err) {
        console.error(err)
    }

    /* Return request. */
    return request
}

const reconnect = () => {
    /* Open client connection. */
    client.connect(ROSTRUM_PORT, ROSTRUM_HOST, async function() {
        console.log('Connected!')
        let result
        result = await makeRequest("server.version", ["AtomicDEX", ["1.4", "2.0"]])
        // console.log('Connection TESTED!!', result)
    })
}

/* Handle connection data. */
client.on('data', async function (_data) {
	// console.log('Received: ' + _data)

    /* Initialize locals. */
    let data
    let id
    let result

    try {
        data = JSON.parse(_data)
    } catch (err) {
        console.error(err)
    }

    /* Validate data. */
    if (data && data.id) {
        /* Set (request) id. */
        id = data.id

        /* Validate request id. */
        if (requests[id]) {
            // console.log('REQUEST', requests[id])
            /* Set results. */
            result = data.result

// TODO Filter results.

            /* Resolve request. */
            requests[id].resolve(result)
        }
    } else {
        console.error('DATA ERROR!', data)

        /* Reject request. */
        requests[id].reject(data)
    }
})

/* Close connection. */
client.on('close', function() {
	console.log('Connection closed')

    /* Reconnect to client. */
    // FIXME Add a back-off for failed connection
    setTimeout(reconnect, RECONNECTION_DELAY)
})

/* Make initial (re-)connection. */
reconnect()

/**
 * Core (Node) Module
 *
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
export default async (req, res) => {
    let action
    let address
    let body
    let endpoint
    let params
    let pkg
    let response

    try {
        body = req.body
        console.log('BODY', body)

        action = body.action
        address = body.address
        params = body.params

        /* Validate body. */
        if (!body) {
            /* Set status. */
            res.status(400)

            /* Return error. */
            return res.json({
                error: 'Missing body parameter.'
            })
        }

        const validActions = [
            'blockchain.address.get_balance',
            'server.version',
        ]

        if (validActions.includes(action)) {
            response = await makeRequest(action, params)
            console.log('RESPONSE', response)
            return res.json(response)
        } else {
            console.error('ERROR! Invalid action', action)
        }

        if (!pkg) {
            /* Set status. */
            res.status(400)

            /* Return error. */
            return res.json({
                error: 'Invalid action requested.'
            })
        }

        /* Fallback. */
        return res.end('Oops! Something went wrong.')
    } catch (err) {
        console.error('CORE ERROR', err)

        return res.json(err)
    }
}
