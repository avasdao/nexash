/* Import types. */
import AffiliateType from '../types/Affiliate.js'

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

const TEST_AFFILIATE = {
    affiliateid: '12345',
    shortid: '123',
    rewards: {
        rewardid: 'abcef',
        affiliateid: '12345',
        amount: 1337,
        dateCreated: 1234567890,
    },
    dateAdded: 1234567890,
}

export default {
    type: AffiliateType,
    args: {
        address: {
            type: GraphQLString,
            description: `Provide a Nexa __Address__ to link to your __Affiliate__ account.`,
        },
    },
    resolve: (_root, args, ctx) => {
        console.log('AFFILIATE ARGS:', args)

        return TEST_AFFILIATE
    },
    description: `Add a new __Affiliate__ member to the __NexaShell Rewards__ program.`,
}
