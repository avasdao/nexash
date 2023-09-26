/* Import types. */
// import OwnerType from '../types/Owner.js'

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
    type: new GraphQLList(GraphQLString),
    args: {
        address: {
            type: new GraphQLList(GraphQLString),
            description: `Provide the __Address__ for an Owner.`,
        },
    },
    resolve: (_root, _args, _ctx) => {
        console.log('Owner (args):', _args)

        return [{
            field1: 'This is a BLANK asset!',
            field2: 1337,
            field3: 88888888,
        }]
    },
    description: `Request _(strucutred)_ __Owner__ details, aggregated from multiple data sources, for your convenience.`,
}