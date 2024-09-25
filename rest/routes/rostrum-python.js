/* Import modules. */
import moment from 'moment'
import Net from 'net'
import { v4 as uuidv4 } from 'uuid'

/* Initialize constants. */
const KEEP_ALIVE_INTERVAL = 60000 // 60 seconds
const MAX_DATA_BUFFER_SIZE = 65536
const RECONNECTION_DELAY = 100 // 0.1 seconds
const REQUEST_TIMEOUT_DELAY = 10 // 10 seconds
const ROSTRUM_HOST = '127.0.0.1'
const ROSTRUM_PORT = 20001
const TIMEOUT_CHECK_INTERVAL = 2500 // 0.5 seconds

/* Initialize requests handler. */
const requests = {}

/* Initialize request buffer. */
let dataBuffer

/* Initialize client. */
const client = new Net.Socket()

const keepAlive = () => {
    makeRequest('server.ping')
        .catch(err => console.error(err))
}

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
    // python3 /usr/src/rostrum/contrib/client.py blockchain.address.decode nexa:tp0jg4h6gj5gcj5rrf9h6xclxstk52dr72yyttmrn6umrjyd6sqqqsy86tk9q
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
    let request
    let error
    let body
    let msg
    let params
    let response

    try {
        /* Set body. */
        body = req.body
        console.log('BODY', body)

        /* Validate body. */
        if (!body) {
            /* Set status. */
            res.status(400)

            /* Return error. */
            return res.json({
                error: 'Missing body parameter.'
            })
        }

        /* Set request. */
        request = body.request

        /* Validate request. */
        if (!request) {
            /* Set status. */
            res.status(400)

            /* Return error. */
            return res.json({
                error: 'Missing request parameter.'
            })
        }

        /* Set parameters. */
        params = body.params || []

        /* Set ALL valid requests. */
        const validRequests = [
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

        /* Validate request. */
        if (validRequests.includes(request)) {
            /* Make request. */
            response = await makeRequest(request, params)
                .catch(err => {
                    console.error(err)

                    /* Set error. */
                    error = err
                })
            console.log('RESPONSE', response)

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
            msg = `[ ${request} ] is an INVALID request.`

            /* Return (error) message. */
            return res.end(msg)
        }
    } catch (err) {
        console.error('CORE ERROR', err)

        return res.json(err)
    }
}
