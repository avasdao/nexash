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
    resolve: (_root, args, ctx) => {
        console.log('ACCOUNT ARGS:', args)
        return {
            field1: 'This is an ACCOUNT asset!',
            field2: 1337,
            field3: 888,
        }
    },
    description: `Discover all the __Accounts__ supported by Nexa Exchange and our partners.`,
}
