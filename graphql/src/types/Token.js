/* Import modules. */
import BigInt from 'graphql-bigint'

/* Import types. */
// import BlankType from './Blank.js'

import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} from 'graphql'

export default new GraphQLObjectType({
    name: 'Token',
    fields: () => ({

        groupid: {
            type: new GraphQLNonNull(GraphQLString),
            description: `The group identifier.`,
        },

        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: `The name of the token.`,
        },

        ticker: {
            type: new GraphQLNonNull(GraphQLString),
            description: `The token's preferred ticker symbol.`,
        },

        balance: {
            type: new GraphQLNonNull(BigInt),
            description: `The oustanding balance of tokens in circulation.`,
        },

        url: {
            type: GraphQLString,
            description: `The url of the token description json document.`,
        },

        hash: {
            type: GraphQLString,
            description: `The hash of the token description json document.`,
        },

        authority: {
            type: GraphQLString,
            description: `TBD`,
        },

        subgroup: {
            type: GraphQLString,
            description: `TBD`,
        },

        mintedAt: {
            type: new GraphQLNonNull(GraphQLInt),
            description: `The timestamp that this Token was minted / confirmed on the blockchain.`,
        },

    }),
    description: `A __Token__ represents an Asset of value that is managed on the blockchain.`,
})
