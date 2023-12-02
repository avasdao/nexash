/* Import modules. */
import { GraphQLObjectType } from 'graphql'

/* Import mutations. */
import account from './account.js'
import address from './address.js'
import block from './block.js'
import meta from './meta.js'
import profile from './profile.js'
import script from './script.js'
import token from './token.js'
import transaction from './transaction.js'

/* Set name. */
const name = 'Query'

/* Set (Mutation) fields. */
const fields = {
    account,
    address,
    block,
    meta,
    profile,
    script,
    token,
    transaction,
}

/* Set (Mutation) description. */
const description = `
Make requests for data directly from the [__Nexa__](https://nexa.org) blockchain and our high-speed storage.
\nPlease visit the [__NexaShell Docs__](https://docs.nexa.exchange) for more information.
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
