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
            description: `The group ID of the token.`,
        },

        groupQuantity: {
            type: GraphQLString,
            description: `The number of tokens.`,
        },

        groupAuthority: {
            type: GraphQLString,
            description: `The (optional) authority.`,
        },

        addresses: {
            type: new GraphQLList(GraphQLString),
            description: `TBD`,
        },

    }),
    description: `A __Script Public Key__ provides the details for the authorized spender.`,
})
