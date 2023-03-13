import cors from 'cors'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

/* Set port. */
const PORT = 3000

// NOTE: Construct a schema, using GraphQL schema language.
const schema = buildSchema(`
  type Query {
    hello(chain: String): String

    addr(base58: String, script: String): Address
    addrs(base58: [String], script: [String]): [Address]

    block(height: Int, hash: String): Block
    blocks(height: [Int], hash: [String]): [Block]

    token(id: String, owner: String): Token
    tokens(id: [String], owner: [String]): [Token]

    tx(txid: String, txidem: String): Transaction
    txs(txid: [String], txidem: [String]): [Transaction]
  }

  type Address {
    base58: String
    script: String
    type: String
  }

  type Block {
    height: Int
    hash: String
    txs: [Transaction]
  }

  type Token {
    id: String
  }

  type Transaction {
    txid: String
    txidem: String
    amount: Int
  }
`)

const SAMPLE_TOKEN = {
    txid: 'my-leet-tokenid',
    amount: 888.00
}

const SAMPLE_TX = {
    txid: 'my-leet-txid',
    txidem: 'my-leet-txidem',
    amount: 1337.00
}

// NOTE: The root provides a resolver function for each API endpoint.
const rootValue = {
    hello: (_args) => {
        /* Set chain. */
        const chain = _args?.chain || 'Crypto'

        /* Return greeting. */
        return `Hello ${chain} world!`
    },

    addr: (_args) => {
        return {
            base58: 'nexa:my-awesome-address',
            script: '001840888777666555444333222111',
            type: 'template',
        }
    },

    addrs: (_args) => {
        return [{
            base58: 'nexa:my-awesome-address',
            script: '001840888777666555444333222111',
            type: 'template',
        }]
    },

    block: (_args) => {
        return {
            height: 1337,
            hash: 'my-leet-hash',
            txs: [SAMPLE_TX],
        }
    },

    blocks: (_args) => {
        return [{
            height: 1337,
            hash: 'my-leet-hash',
            txs: [SAMPLE_TX],
        }]
    },

    token: (_args) => {
        return SAMPLE_TOKEN
    },

    tokens: (_args) => {
        return [SAMPLE_TOKEN]
    },

    tx: (_args) => {
        return SAMPLE_TX
    },

    txs: (_args) => {
        return [SAMPLE_TX]
    },
}

/* Set interactive flag. */
const graphiql = true

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

/* Setup GraphQL endpoint. */
app.use('/graphql', graphqlHTTP(graphqlOptions))

app.listen(PORT)
console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`)
