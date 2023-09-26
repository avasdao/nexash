/* Import modules. */
import { GraphQLSchema } from 'graphql'

/* Import (Schema) objects. */
import mutation from './mutation/index.js'
import query from './query/index.js'
import subscription from './subscription/index.js'

/**
 * GraphQL Schema
 *
 * Construct a GraphQL schema and define the necessary resolvers.
 */
export default new GraphQLSchema({
    /* Query */
    query,

    /* Mutation */
    mutation,

    /* Subscription */
    subscription,
})
