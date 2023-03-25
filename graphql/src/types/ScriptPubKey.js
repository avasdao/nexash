/* Import types. */
// import Type from '../types/Type.js'

import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

export default new GraphQLObjectType({
    name: 'ScriptPubKey',
    fields: () => ({

        asm: {
            type: new GraphQLNonNull(GraphQLString),
            description: `TBD`,
        },

        hex: {
            type: new GraphQLNonNull(GraphQLString),
            description: `TBD`,
        },

        type: {
            type: GraphQLString,
            description: `TBD`,
        },

        scriptHash: {
            type: GraphQLString,
            description: `TBD`,
        },

        argsHash: {
            type: GraphQLString,
            description: `TBD`,
        },

        addresses: {
            type: new GraphQLList(GraphQLString),
            description: `TBD`,
        },

    }),
    description: `A __Script Public Key__ provides the details for the authorized spender.`,
})
