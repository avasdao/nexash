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
    name: 'Session',
    fields: () => ({

        sessionid: {
            type: new GraphQLNonNull(GraphQLString),
            description: `A unique __Session ID__ to identify and secure your authorized activities.`,
        },

        errors: {
            type: new GraphQLList(GraphQLString),
            description: `A list of __Errors__ reported during the request.`,
        },

    }),
    description: `A __Session__ allows for _authenticated_ requests.`,
})
