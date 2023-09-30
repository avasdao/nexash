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

        hasPreviousPage: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description: `Indicates the existance of previous records.`,
        },

        startCursor: {
            type: GraphQLString,
            description: `Starting dataset position.`,
        },

        hasNextPage: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description: `Indicates the existance of additional records.`,
        },

        endCursor: {
            type: GraphQLString,
            description: `Ending dataset position.`,
        },

    }),
    description: `A __PageInfo__ description goes here.`,
})
