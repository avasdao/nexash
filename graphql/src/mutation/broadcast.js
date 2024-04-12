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
    type: GraphQLString,
    args: {
        hexstring: {
            type: GraphQLString,
            description: `Provide a hex-encoded (raw) transaction.`,
        },
    },
    resolve: (_root, args, ctx) => {
        console.log('BROADCAST ARGS:', args)
        return 'Transaction Broadcast was successfully!'
    },
    description: `Broadcast a Nexa transaction to the network.`,
}
