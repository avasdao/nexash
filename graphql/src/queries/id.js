/* Import types. */
import ProfileType from '../types/Profile.js'

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
    type: new GraphQLList(ProfileType),
    args: {
        address: {
            type: new GraphQLList(GraphQLString),
            description: `Provide one or more __Address(es)__ to receive _Profile_ and/or _Session_ info.`,
        },

        sessionid: {
            type: new GraphQLList(GraphQLString),
            description: `Provide one or more __Session ID(s)__ to receive _Profile_ and/or _Session_ info.`,
        },
    },
    resolve: (_root, args, ctx) => {
        console.log('Nexa ID (args):', args)

        return [{
            field1: 'This is a PROFILE!',
            field2: 1337,
            field3: 88888888,
        }]
    },
    description: `Access to a Nexa ID "public" authentication service.`,
}
