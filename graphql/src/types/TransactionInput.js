/* Import modules. */
import BitInt from 'graphql-bigint'

/* Import types. */
import ScriptSigType from './ScriptSig.js'

import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} from 'graphql'

export default new GraphQLObjectType({
    name: 'TransactionInput',
    fields: () => ({

        outpoint: {
            type: new GraphQLNonNull(GraphQLString),
            description: `TBD`,
        },

        amount: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: `TBD`,
        },

        scriptSig: { 
            type: new GraphQLNonNull(ScriptSigType),
            description: `TBD`,
        },

        sequence: {
            type: BitInt,
            description: `TBD`,
        },

    }),
    description: `A __Transaction Input__ authorizes UTXOs to be spent.`,
})
