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
        value: { type: new GraphQLNonNull(GraphQLFloat) },
        type: { type: GraphQLInt },
        n: { type: GraphQLInt },
        scriptPubKey: { type: new GraphQLNonNull(ScriptPubKeyType) },
        outpoint: { type: GraphQLString },
    }),
    description: `A __Transaction Output__ defines where assets are sent.`,
})
