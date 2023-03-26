/* Import types. */
import TokenType from '../types/Token.js'

import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} from 'graphql'

export default {
    type: new GraphQLList(TokenType),
    args: {

        tokenid: {
            type: new GraphQLList(GraphQLString),
            description: `Enter one or more __Token(s) or Group ID(s)__ here to retrieve data about.`,
        },

        ownerid: {
            type: new GraphQLList(GraphQLString),
            description: `Enter one or more __Owner Address(es)__ here to retrieve _Token_ data about.`,
        },

    },
    resolve: (_root, args, ctx) => {
        console.log('Token (args):', args)

        return [{
            groupid: 'nexa:tzgroupid-goes-here',
            name: `My Awesome Token`,
            ticker: `AWE`,
        }]
    },
    description: `Request __Token__ details from on-chain data.`,
}
