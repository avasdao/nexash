/* Import types. */
import LogType from '../types/Log.js'

import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLSchema,
    GraphQLString,
} from 'graphql'

const TEST_LOG = {
    logid: '12345',
    payload: 'place-your-log-details-here',
    dateAdded: 1234567890,
}

export default {
    type: LogType,
    args: {
        address: {
            type: GraphQLString,
            description: `Provide a Nexa __Address__ to link to your __Log__ account.`,
        },
    },
    resolve: (_root, args, ctx) => {
        console.log('AFFILIATE ARGS:', args)

        return TEST_LOG
    },
    description: `Add a new __Log__ entry to the __NexaShell Rewards__ program.`,
}
