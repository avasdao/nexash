/* Import types. */
// import Type from '../types/Type.js'

import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
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
            type: new GraphQLNonNull(GraphQLString),
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

        group: {
            type: GraphQLString,
            description: `TBD`,
        },

        groupQuantity: {
            type: GraphQLString,
            description: `Tracks the number of tokens.`,
        },

        groupAuthority: {
            type: GraphQLString,
            description: `Tracks the (optional) authority.`,
        },

        addresses: {
            type: new GraphQLList(GraphQLString),
            description: `TBD`,
        },

    }),
    description: `A __Script Public Key__ provides the details for the authorized spender.`,
})
