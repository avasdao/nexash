/* Import types. */
import ScriptPubKeyType from './ScriptPubKey.js'

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
    name: 'TransactionOutput',
    fields: () => ({

        value: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: `TBD`,
        },

        type: {
            type: GraphQLInt,
            description: `TBD`,
        },

        n: {
            type: GraphQLInt,
            description: `TBD`,
        },

        scriptPubKey: {
            type: new GraphQLNonNull(ScriptPubKeyType),
            description: `TBD`,
        },

        outpoint: {
            type: GraphQLString,
            description: `TBD`,
        },
        
    }),
    description: `A __Transaction Output__ defines where assets are sent.`,
})
