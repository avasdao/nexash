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
import OwnerConnectionType from '../types/OwnerConnection.js'

export default {
    type: OwnerConnectionType,
    args: {
        address: {
            type: new GraphQLList(GraphQLString),
            description: `Provide the __Address__ for an Owner.`,
        },
    },
    resolve: (_root, _args, _ctx) => {
        console.log('Owner (args):', _args)

        /* Set total count. */
        const totalCount = 1

        /* Build edges. */
        const edges = [{
            node: {
                nickname: 'SatoshisGhost',
                balance: 1337,
                nft: [{
                    groupid: 'cool_group',
                    groupidHex: '1337beef',
                    name: 'My Kewlst NFT evr',
                    mintedAt: 123,
                }],
            },
            cursor: null,
        }]
        // console.log('EDGES', edges);

        /* Build page info. */
        const pageInfo = {
            hasPreviousPage: false,
            startCursor: null,
            hasNextPage: true,
            endCursor: Buffer.from('hi there!').toString('base64'),
        }

        /* Build connection. */
        const connection = {
            totalCount,
            edges,
            pageInfo,
        }

        /* Return transaction details. */
        return connection
    },
    description: `Request _(strucutred)_ __Owner__ details, aggregated from multiple data sources, for your convenience.`,
}
