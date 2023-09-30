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
                field1: 'This is a BLANK asset!',
                field2: 1337,
                nft: [{
                    groupid: 'cool_group',
                    name: 'My kewl nft',
                    mintedAt: 0123,
                }],
            },
            cursor: null,
        }]
        // console.log('EDGES', edges);

        /* Build page info. */
        const pageInfo = {
            startCursor: null,
            endCursor: null,
            hasNextPage: false,
            hasPreviousPage: false,
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
