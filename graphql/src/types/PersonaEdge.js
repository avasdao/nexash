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
import PersonaType from '../types/Persona.js'

export default new GraphQLObjectType({
    name: 'PersonaEdge',
    fields: () => ({

        node: {
            type: new GraphQLNonNull(PersonaType),
            description: `TBD`,
        },

        cursor: {
            type: GraphQLString,
            description: `TBD`,
        },

    }),
    description: `A __Persona Edge__ description goes here.`,
})
