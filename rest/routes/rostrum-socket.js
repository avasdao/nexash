/* Import modules. */
import moment from 'moment'
import Net from 'net'
import { v4 as uuidv4 } from 'uuid'

/* Initialize constants. */
const KEEP_ALIVE_INTERVAL = 60000 // 60 seconds
const MAX_DATA_BUFFER_SIZE = 65536
const RECONNECTION_DELAY = 100 // 0.1 seconds
const REQUEST_TIMEOUT_DELAY = 30 // 30 seconds
const ROSTRUM_HOST = '127.0.0.1'
const ROSTRUM_PORT = 20001
const TIMEOUT_CHECK_INTERVAL = 2500 // 0.5 seconds

/* Initialize clients handler. */
const clients = {}

/* Initialize requests handler. */
const requests = {}

// const keepAlive = () => {
//     makeRequest('server.ping')
//         .catch(err => console.error(err))
// }

const timeout = () => {
    console.log('REQUESTS', requests)

    /* Handle all requests. */
    Object.keys(requests).forEach(_requestid => {
        /* Set request. */
        const request = requests[_requestid]
        console.log('REQUEST', request)

        /* Set (time) now. */
        const now = moment().unix()
        console.log('NOW', now)

        /* Validate timeout. */
        if (now > request.timeout) {
            /* Reject request. */
            request.reject({
                error: 'Your request has TIMED OUT!'
            })

            /* Remove request from queue. */
            delete requests[_requestid]

            console.log('Request [', _requestid, '] has been removed!')
        }

    })
}

/**
 * Make Request
 *
 * Make a data request to a local Rostrum server.
 */
const makeRequest = (_method, _params) => {
    /* Initialize handlers. */
    let method
    let params
    let resolve
    let reject
    let timeout

    /* Generate (request) id. */
    const id = uuidv4()
    // console.log('REQUEST ID', id)

    /* Initialize client. */
    clients[id] = {}
    clients[id].socket = new Net.Socket()

    /* Return promise (to caller). */
    clients[id].request = new Promise((_resolve, _reject) => {
        resolve = _resolve
        reject = _reject
    })

    /* Set timeout. */
    clients[id].timeout = moment().add(REQUEST_TIMEOUT_DELAY, 'seconds').unix()

    /* Add request to handler. */
    requests[id] = { resolve, reject, timeout }

    /* Set method. */
    method = _method

    /* Set parameters. */
    params = _params || []

    /* Validate parameters. */
    if (!Array.isArray(params)) {
        params = [params]
    }

    /* Build JSON. */
    const json = {
        id,
        method,
        params,
    }
    // console.log('JSON', json)

    try {
        /* Open client connection. */
        clients[id].socket.connect(ROSTRUM_PORT, ROSTRUM_HOST, function () {
            console.log('Connected!')

            /* Write to client. */
            clients[id].socket.write(`${JSON.stringify(json)}\n`)
        })

        /* Handle connection data. */
        clients[id].socket.on('data', async function (_data) {
        	// console.log('Received: ' + _data.length)

            /* Initialize locals. */
            let data
            let dataId
            let result

            // if (!_data.toString().includes('"jsonrpc":"2.0"')) {
            if (clients[id].buffer) {
                /* Concatenate (raw) data. */
                clients[id].buffer = Buffer.concat([ clients[id].buffer, _data ])
                // console.log('BUFFER-2', clients[id].buffer.length)

                if (_data.length === MAX_DATA_BUFFER_SIZE) {
                    return // skip remaining processing
                }
            }

            if (!clients[id].buffer && _data.length === MAX_DATA_BUFFER_SIZE) {
                /* Save NEW (raw) data buffer. */
                clients[id].buffer = _data
                // console.log('BUFFER-1', clients[id].buffer.length)

                return // skip remaining processing
            }

            try {
                if (clients[id].buffer) {
                    /* Parse JSON data. */
                    data = JSON.parse(clients[id].buffer)

                    /* Clear data buffer. */
                    clients[id].buffer = null
                } else {
                    /* Parse JSON data. */
                    data = JSON.parse(_data)
                }
            } catch (err) {
                console.error(err)
            }

            /* Validate data. */
            if (data && data.id) {
                /* Set (request) id. */
                dataId = data.id

                /* Validate request id. */
                if (requests[dataId]) {
                    // console.log('REQUEST', requests[id])
                    /* Validate data error. */
                    if (data.error) {
                        return requests[dataId].reject(data.error)
                    }

                    /* Set results. */
                    result = data.result

        // TODO Filter results.

                    /* Resolve request. */
                    requests[dataId].resolve(result)

                    /* Delete request. */
                    delete requests[dataId]
                }
            } else {
                console.error('DATA ERROR!', data, _data.toString())
                // console.error('DATA ERROR!', clients[id].buffer.toString())
            }
        })

        /* Close connection. */
        clients[id].socket.on('close', function() {
        	console.log('Connection closed')

            /* Reconnect to client. */
            // FIXME Add a back-off for failed connection
            // setTimeout(reconnect, RECONNECTION_DELAY)
        })
    } catch (err) {
        console.error(err)
    }

    /* Return request. */
    return clients[id].request
}



/* Make initial (re-)connection. */
// reconnect()

/* Setup (keep-alive) interval. */
// setInterval(keepAlive, KEEP_ALIVE_INTERVAL)
// setTimeout(keepAlive, 3000) // FOR DEV PURPOSES ONLY

// setInterval(timeout, TIMEOUT_CHECK_INTERVAL)

/**
 * Rostrum Module
 *
 * Manages all (local) Rostrum requests.
 */
export default async (req, res) => {
    /* Initialize locals. */
    let error
    let body
    let method
    let msg
    let params
    let response

    try {
        /* Set body. */
        body = req.body
        // console.log('BODY', body)

        /* Validate body. */
        if (!body) {
            /* Set status. */
            res.status(400)

            /* Return error. */
            return res.json({
                error: 'Missing body parameter.'
            })
        }

        /* Set method. */
        method = body.method || body.request

        /* Validate method. */
        if (!method) {
            /* Set status. */
            res.status(400)

            /* Return error. */
            return res.json({
                error: 'Missing method parameter.'
            })
        }

        /* Set parameters. */
        params = body.params || []

        /* Set ALL valid methods. */
        const validMethods = [
            'blockchain.address.decode',
            'blockchain.address.get_balance',
            'blockchain.address.get_first_use',
            'blockchain.address.get_history',
            'blockchain.address.get_mempool',
            'blockchain.address.get_scripthash',
            'blockchain.address.listunspent',
            'blockchain.block.get',
            'blockchain.headers.tip',
            'blockchain.transaction.get',
            'blockchain.utxo.get',
            'token.address.get_balance',
            'token.address.get_history',
            'token.address.get_mempool',
            'token.address.listunspent',
            'token.genesis.info',
            'token.nft.list',
            'token.transaction.get_history',
            'server.version',
        ]

        /* Validate method. */
        if (validMethods.includes(method)) {
            /* Make request. */
            response = await makeRequest(method, params)
                .catch(err => {
                    console.error(err)

                    /* Set error. */
                    error = err
                })
            // console.log('RESPONSE', response)

            // TODO Validate response.
            if (error) {
                res.status(400)

                return res.json(error)
            }

            return res.json(response)
        } else {
            /* Set status. */
            res.status(400)

            /* Set message. */
            msg = `[ ${method} ] is an INVALID method.`

            /* Return (error) message. */
            return res.end(msg)
        }
    } catch (err) {
        console.error('CORE ERROR', err)

        return res.json(err)
    }
}
