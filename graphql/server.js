import cors from 'cors'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

/* Set port. */
const PORT = 3000

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The root provides a resolver function for each API endpoint
const rootValue = {
    hello: () => {
        return 'Hello world!'
    },
}

const graphiql = true

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
