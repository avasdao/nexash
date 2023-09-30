/* Import modules. */
import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} from 'graphql'

/* Import types. */
// import OwnerType from './Owner.js'

export default new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({

        field1: {
            type: GraphQLString,
            description: `TBD`,
        },

        field2: {
            type: GraphQLInt,
            description: `TBD`,
        },

        field3: {
            type: GraphQLInt,
            description: `TBD`,
        },

    }),
    description: `A __Owner__ description goes here.`,
})
