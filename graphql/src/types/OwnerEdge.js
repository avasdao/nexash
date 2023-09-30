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
import OwnerType from '../types/Owner.js'

export default new GraphQLObjectType({
    name: 'OwnerEdge',
    fields: () => ({

        node: {
            type: new GraphQLNonNull(OwnerType),
            description: `TBD`,
        },

        cursor: {
            type: GraphQLString,
            description: `TBD`,
        },

    }),
    description: `A __Owner Edge__ description goes here.`,
})
