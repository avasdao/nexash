/* Import modules. */
import { GraphQLObjectType } from 'graphql'

/* Import mutations. */
import asset from './queries/asset.js'
import block from './queries/block.js'
import transaction from './queries/transaction.js'

/* Set name. */
const name = 'Query'

/* Set (Mutation) fields. */
const fields = {
    asset,
    block,
    transaction,
}

/* Set (Mutation) description. */
const description = `
Make requests for Exchange data directly from the Nexa blockchain and our high-speed storage.
\nVisit our [Documenation](https://docs.nexa.exchange) for more info.
`.trim()

/**
 * Query
 *
 * Make requests for Exchagne data.
 */
export default new GraphQLObjectType({
    name,
    fields,
    description,
})
