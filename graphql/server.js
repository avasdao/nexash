import cors from 'cors'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

/* Set port. */
const PORT = 3000

// NOTE: Construct a schema, using GraphQL schema language.
const schema = buildSchema(`
  type Transaction {
    hash: String
    amount: Int
  }

  type Block {
    height: Int
    hash: String
    txs: [Transaction]
  }

  type Query {
    hello(chain: String): String
    blocks(height: Int, hash: String): Block
    txs(hash: String): Transaction
  }
`)

// NOTE: The root provides a resolver function for each API endpoint.
const rootValue = {
    hello: (_args) => {
        /* Set chain. */
        const chain = _args?.chain || 'Crypto'

        /* Return greeting. */
        return `Hello ${chain} world!`
    },

    blocks: (_args) => {
        return [{
            hash: 'my-new-hash',
        }]
    },

    txs: (_args) => {
        return [{
            txid: 'my-tx-id',
            txidem: 'my-tx-idem',
        }]
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
