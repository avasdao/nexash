/* Import types. */
// import Type from '../types/Type.js'

import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

export default new GraphQLObjectType({
    name: 'ScriptPubKey',
    fields: () => ({
        asm: { type: new GraphQLNonNull(GraphQLString) },
        hex: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLString },
        scriptHash: { type: GraphQLString },
        argsHash: { type: GraphQLString },
        addresses: { type: new GraphQLList(GraphQLString) },
    }),
    description: `A __Script Public Key__ provides the details for the authorized spender.`,
})
