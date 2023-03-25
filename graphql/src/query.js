/* Import modules. */
import { GraphQLObjectType } from 'graphql'

/* Import mutations. */
import asset from './queries/asset.js'
import block from './queries/block.js'

/* Set name. */
const name = 'Query'

/* Set (Mutation) fields. */
const fields = {
    asset,
    block,
}

/* Set (Mutation) description. */
const description = `
Make requests for Exchange data directly from the Nexa blockchain and our high-speed storage.
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
