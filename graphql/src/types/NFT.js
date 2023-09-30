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
    name: 'NFT',
    fields: () => ({

        groupid: {
            type: new GraphQLNonNull(GraphQLString),
            description: `The group identifier.`,
        },

        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: `The name of the token.`,
        },

        mintedAt: {
            type: new GraphQLNonNull(GraphQLInt),
            description: `The timestamp that this NFT was minted / confirmed on the blockchain.`,
        },

    }),
    description: `A __NFT__ represents an Asset of value that is managed on the blockchain.`,
})
