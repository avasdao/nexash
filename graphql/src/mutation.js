/* Import modules. */
import { GraphQLObjectType } from 'graphql'

/* Import mutations. */
import addAffiliate from './mutations/addAffiliate.js'
import createSession from './mutations/createSession.js'

/* Set name. */
const name = 'Mutation'

/* Set (Mutation) fields. */
const fields = {
    addAffiliate,
    createSession,
}

/* Set (Mutation) description. */
const description = `
Make authenticated requests to the entire suite of [__Nexa__](https://nexa.org) on-chain data services.
\nPlease visit the [__NexaShell Documentation__](https://docs.nexa.exchange) for more information.
`.trim()

/**
 * Mutation
 *
 * Make authenticated requests to Exchange services.
 */
export default new GraphQLObjectType({
    name,
    fields,
    description,
})
