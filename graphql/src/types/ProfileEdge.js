/* Import modules. */
import {
    // GraphQLBoolean,
    // GraphQLFloat,
    // GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    // GraphQLInt,
    GraphQLString,
} from 'graphql'

/* Import types. */
import ProfileType from '../types/Profile.js'

export default new GraphQLObjectType({
    name: 'ProfileEdge',
    fields: () => ({

        node: {
            type: new GraphQLNonNull(ProfileType),
            description: `TBD`,
        },

        cursor: {
            type: GraphQLString,
            description: `TBD`,
        },

    }),
    description: `A __Profile Edge__ description goes here.`,
})
