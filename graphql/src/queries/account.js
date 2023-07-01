/* Import types. */
import AccountType from '../types/Account.js'

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

export default {
    type: new GraphQLList(AccountType),
    args: {
        address: {
            type: new GraphQLList(GraphQLString),
            description: `Enter one ore more __Account Address(es)__ to limit your search.`,
        },
    },
    resolve: (_root, _args, _ctx) => {
        console.log('ACCOUNT ARGS:', _args)
        return {
            field1: 'This is an ACCOUNT asset!',
            field2: 1337,
            field3: 888,
        }
    },
    description: `Query details on every __Account__ supported by NexaShell and our partners.`,
}
