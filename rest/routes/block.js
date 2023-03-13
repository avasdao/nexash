/* Import modules. */
import moment from 'moment'
import fetch from 'node-fetch'
import { v4 as uuidv4 } from 'uuid'

/* Set Nexa GraphQL endpoint. */
const ENDPOINT = 'https://nexa.sh/graphql'

/**
 * Run Demo
 *
 * Re-starts the demo with the provided parameters.
 */
const run = async (query) => {
  /* Make query request. */
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query
    }),
  }).catch(err => console.error(err))
  // console.log('RESPONSE', response)

  /* Set (response) data. */
  const data = await response.json()
  // console.log('DATA', data);

  return data
}

/**
 * Block Module
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
        // console.log('Request body:', body)

        params = req.params
        // console.log('Request parameters', params)

        /* Validate params. */
        // FIXME Add better error-handling.
        if (!params?.height) {
            /* Set status. */
            res.status(400)

            /* Return error. */
            return res.json({
                error: 'Missing block (height) parameter.'
            })
        }

// console.log('params.height-1', params.height)
//         if (params.height.includes(',')) {
//             params.height = params.height.split(',')
//         }
// console.log('params.height-2', params.height)

        const query = `
{
  block(height: [${params.height}]) {
    height
    hash
    size
    txcount
    feePoolAmt
    merkleroot
    time
    mediantime
    nonce
    bits
    difficulty
    chainwork
    utxoCommitment
    minerData
    status
    onMainChain
    previousblockhash
    ancestorhash
    txid
    txidem
  }
}`
console.log('QUERY', query)

        const response = await run(query)
        console.log('RESPONSE', response)

        return res.json(response?.data?.block)
    } catch (err) {
        console.error('BLOCK ERROR', err)

        return res.json(err)
    }
}
