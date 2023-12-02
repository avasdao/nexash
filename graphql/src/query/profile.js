/* Import modules. */
import moment from 'moment'

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
import ProfileConnectionType from '../types/ProfileConnection.js'

export default {
    type: ProfileConnectionType,
    args: {
        address: {
            type: new GraphQLList(GraphQLString),
            description: `Provide the __Address__ for an Profile.`,
        },
    },
    resolve: (_root, _args, _ctx) => {
        console.log('Profile (args):', _args)

        /* Set connection info. */
        const connInfo = {
            profiles: null,
            updatedAt: moment().unix(),
        }

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
            connInfo,
            totalCount,
            edges,
            pageInfo,
        }

        /* Return transaction details. */
        return connection
    },
    description: `Request _(strucutred)_ __Profile__ details, aggregated from multiple data sources, for your convenience.`,
}
