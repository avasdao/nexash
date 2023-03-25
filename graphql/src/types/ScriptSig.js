import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

export default new GraphQLObjectType({
    name: 'ScriptSig',
    fields: () => ({
        asm: { type: new GraphQLNonNull(GraphQLString) },
        hex: { type: new GraphQLNonNull(GraphQLString) },
    }),
    description: `A __Script Signature__ provides the authorization details allowing a UTXO to be spent.`,
})
