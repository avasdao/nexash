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
    "Provides information about on-chain addresses: balance, first seen, # of transactions."
    addrs(
        "Provide a base58 (nexa:) address."
        base58: [String],

        "Provide a Script address."
        script: [String],
    ): [Address]

    "Retreive Block information, including: hash, # of txs, etc."
    blocks(height: [Int], hash: [String]): [Block]

    "Retreive Token information, including: id, imageUrl."
    tokens(id: [String], owner: [String]): [Token]

    "Retreive Transaction information, including: txid, txidem, blocknum."
    txs(txid: [String], txidem: [String]): [Transaction]
  }

  type Address {
    "Base58 encoded address."
    base58: String

    "Raw encoded address."
    script: String

    "Address type."
    type: String
  }

  type Block {
    "Height of the block."
    height: Int

    "Hash of the block."
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
    owner: String
    tokens: [Token]
  }

  type Owner {
    id: String
    tokens: [Token]
    txs: [Transaction]
  }

  type Token {
    id: String
    owner: String
    groups: [Group]
  }

  type Transaction {
    txid: String
    txidem: String
    owner: String
    amount: Int
  }
`)

// NOTE: The root provides a resolver function for each API endpoint.
const rootValue = {
    addrs: async (_args) => {
        /* Set base58. */
        // NOTE: Array of addresses.
        const base58 = _args?.base58 || ['nexa:my-awesome-address']

        return [{
            base58: base58[0],
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
        const id = _args?.id || 'my-leet-tokenid'

        return [{
            id,
            owner: 'nexa:satoshione',
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
    defaultQuery: `######################################################################
#
# Welcome to the NexaShell GraphiQL
#
# Application builders can make great use of this tool for:
#   - writing queries
#   - validating queries
#   - and testing queries
#
# Sample queries in each (of 4) data categories:
#
#     Addresses: (addrs)    Request transaction histories
#                           and full balance details.
#
#        Blocks: (blocks)   Request confirmation and transaction
#                           details.
#
#        Tokens: (tokens)   Request asset registration/genesis
#                           information and activity details.
#
#  Transactions: (txs)      Request activity details.
#
######################################################################

{
  # Sample address query
  addrs(base58: ["nexa:..."]) {
    base58
    script
    type
  }

  # Sample block query
  blocks(height: [227570]) {
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

  # Sample token query
  tokens(id: ["sample"]) {
    id
  }

  # Sample transaction query
  txs(txid: ["sample"]) {
    txid
    txidem
    amount
  }
}
    `,
}

/* Set options. */
const graphqlOptions = {
    schema,
    rootValue,
    graphiql,
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
