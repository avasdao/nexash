/* Import modules. */
import { GraphQLObjectType } from 'graphql'

/* Import mutations. */
import account from './queries/account.js'
import block from './queries/block.js'
import transaction from './queries/transaction.js'

/* Set name. */
const name = 'Query'

/* Set (Mutation) fields. */
const fields = {
    account,
    block,
    transaction,
}

/* Set (Mutation) description. */
const description = `
Make requests for data directly from the [__Nexa__](https://nexa.org) blockchain and our high-speed storage.
\nPlease visit the [__NexaShell Documentation__](https://docs.nexa.exchange) for more information.
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
