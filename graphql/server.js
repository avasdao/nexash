import cors from 'cors'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import rateLimit from 'express-rate-limit'
import PouchDB from 'pouchdb'
import { buildSchema } from 'graphql'

/* Set port. */
const PORT = 6000

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const blocksDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/blocks`)
const txsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/txs`)

// NOTE: Construct a schema, using GraphQL schema language.
const schema = buildSchema(`
  type Query {
    addrs(base58: [String], script: [String]): [Address]
    blocks(height: [Int], hash: [String]): [Block]
    tokens(id: [String], owner: [String]): [Token]
    txs(txid: [String], txidem: [String]): [Transaction]
  }

  """
  Provides information about on-chain addresses:
    - balance
    - first seen
    - # of transactions
  """
  type Address {
    """
    Base58 encoded address
    Check out our [Address Docs](https://docs.nexa.sh/address) for more information.
    """
    base58: String

    """
    Raw encoded address
    Check out our [Address Docs](https://docs.nexa.sh/address) for more information.
    """
    script: String

    """
    Address type
    Check out our [Address Docs](https://docs.nexa.sh/address) for more information.
    """
    type: String
  }

  type Block {
    height: Int
    hash: String
    size: Int
    txcount: Int
    feePoolAmt: Int
    merkleroot: String
    time: Int
    mediantime: Int
    nonce: String
    bits: String
    difficulty: Float
    chainwork: String
    utxoCommitment: String
    minerData: String
    status: String
    onMainChain: Boolean
    previousblockhash: String
    ancestorhash: String
    txid: [String]
    txidem: [String]
    txs: [Transaction]
  }

  type Group {
    id: String
    tokens: [Token]
  }

  type Token {
    id: String
    groups: [Group]
  }

  type Transaction {
    txid: String
    txidem: String
    amount: Int
  }
`)

// NOTE: The root provides a resolver function for each API endpoint.
const rootValue = {
    addrs: async (_args) => {
        /* Set base58. */
        const base58 = _args?.base58 || 'nexa:my-awesome-address'

        return [{
            base58,
            script: '001840888777666555444333222111',
            type: 'template',
        }]
    },

    blocks: async (_args) => {
        /* Set height. */
        const height = _args?.height || 227570

        /* Request block data. */
        const block = await blocksDb
            .get(height)
            .catch(err => {
                console.error(err)
                // TODO: Handle (logging) errors.
            })
        console.log('BLOCK', block)

        return [block] || []
    },

    tokens: async (_args) => {
        /* Set tokenid. */
        const tokenid = _args?.tokenid || 'my-leet-tokenid'

        return [{
            tokenid,
            amount: 888.00
        }]
    },

    txs: async (_args) => {
        /* Set txidem. */
        const txidem = _args?.txidem || 'my-leet-txidem'

        return [{
            txid: 'my-leet-txid',
            txidem,
            amount: 1337.00
        }]
    },
}

/* Set interactive flag. */
const graphiql = {
    defaultQuery: `
/*******************************************************************************
 *
 * Welcome to NexaShell GraphQL Server
 *
 * Quick start queries are show below.
 * Visit https://docs.nexa.sh for more information.
 */

{
  blocks(height: 227570) {
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
    onMainChain
    ancestorhash
  }
}
    `,
}

/* Set options. */
const graphqlOptions = {
    schema,
    rootValue,
    graphiql: true,
}

/* Initialize application. */
const app = express()

/* Enable CORS. */
app.use(cors())

/* Set rate limits. */
const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

/* Setup GraphQL endpoint. */
app.use('/graphql', graphqlHTTP(graphqlOptions))

app.listen(PORT)
console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`)
