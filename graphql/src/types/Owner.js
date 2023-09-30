/* Import modules. */
import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} from 'graphql'

/* Import types. */
import NFTType from '../types/NFT.js'

export default new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({

        field1: {
            type: GraphQLString,
            description: `TBD`,
        },

        field2: {
            type: GraphQLInt,
            description: `TBD`,
        },

        nft: {
            type: new GraphQLList(NFTType),
            description: `List of NFTs owned by this wallet.`,
        },

    }),
    description: `A __Owner__ description goes here.`,
})
