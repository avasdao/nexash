/* Import modules. */
import { GraphQLObjectType } from 'graphql'

/* Import mutations. */
import addAffiliate from './addAffiliate.js'
import addLog from './addLog.js'
import broadcast from './broadcast.js'
import manageSession from './manageSession.js'

/* Set name. */
const name = 'Mutation'

/* Set (Mutation) fields. */
const fields = {
    addAffiliate,
    addLog,
    broadcast,
    manageSession,
}

/* Set (Mutation) description. */
const description = `
Make (un-)authenticated requests to the entire suite of [__Nexa__](https://nexa.org) on-chain data services.
\nPlease visit the [__NexaShell Docs__](https://docs.nexa.exchange) for more information.
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
