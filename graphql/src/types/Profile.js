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
    name: 'Profile',
    fields: () => ({

        nickname: {
            type: GraphQLString,
            description: `TBD`,
        },

        balance: {
            type: GraphQLInt,
            description: `The wallet balance (in $NEXA).`,
        },

        nft: {
            type: new GraphQLList(NFTType),
            description: `List of NFTs owned by this wallet.`,
        },

    }),
    description: `A __Profile__ description goes here.`,
})
