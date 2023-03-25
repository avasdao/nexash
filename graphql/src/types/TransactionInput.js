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
        outpoint: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLFloat) },
        scriptSig: { type: new GraphQLNonNull(ScriptSigType) },
        sequence: { type: BitInt },
    }),
    description: `A __Transaction Input__ authorizes UTXOs to be spent.`,
})
