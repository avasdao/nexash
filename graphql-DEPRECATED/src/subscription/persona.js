/* Import types. */
import PersonaType from '../types/Persona.js'

import {
    GraphQLList,
    GraphQLString,
} from 'graphql'

export default (_pubsub) => ({
    type: PersonaType,
    args: {

        base58: {
            type: new GraphQLList(GraphQLString),
            description: `Filter by transaction idem.`,
        },

        scriptPubKey: {
            type: new GraphQLList(GraphQLString),
            description: `Filter by transaction Script Public Key as sender or receiver.`,
        },

    },
    subscribe: () => _pubsub.asyncIterator(['PROFILE_UPDATE']),
    description: `This subscription will report __every Persona action__ that appears on the blockchain.`,
})
