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
    type: AccountType,
    args: {
        address: {
            type: GraphQLString,
            description: `Enter an __Account Address__ to limit your search.`,
        },
    },
    resolve: (_root, args, ctx) => {
        console.log('ACCOUNT ARGS:', args)
        return {
            field1: 'This is an ACCOUNT asset!',
            field2: 1337,
            field3: 888,
        }
    },
    description: `Query details on every __Account__ supported by NexaShell and our partners.`,
}
