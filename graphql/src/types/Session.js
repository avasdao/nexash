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
            description: `TBD`,
        },

        errors: {
            type: GraphQLString,
            description: `TBD`,
        },
        
    }),
    description: `A __Session__ allows for _authenticated_ requests.`,
})
