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

export default new GraphQLObjectType({
    name: 'Log',
    fields: () => ({

        logid: {
            type: GraphQLString,
            description: `TBD`,
        },

        payload: {
            type: GraphQLString,
            description: `TBD`,
        },

        dateAdded: {
            type: GraphQLInt,
            description: `TBD`,
        },

    }),
    description: `A __Log__ entry.`,
})
