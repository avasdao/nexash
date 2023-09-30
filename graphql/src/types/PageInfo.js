/* Import modules. */
import {
    GraphQLBoolean,
    // GraphQLFloat,
    // GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    // GraphQLInt,
    GraphQLString,
} from 'graphql'

export default new GraphQLObjectType({
    name: 'PageInfo',
    fields: () => ({

        startCursor: {
            type: new GraphQLNonNull(GraphQLString),
            description: `Starting dataset position.`,
        },

        endCursor: {
            type: new GraphQLNonNull(GraphQLString),
            description: `Ending dataset position.`,
        },

        hasNextPage: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description: `Indicates the existance of additional records.`,
        },

        hasPreviousPage: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description: `Indicates the existance of previous records.`,
        },

    }),
    description: `A __PageInfo__ description goes here.`,
})
