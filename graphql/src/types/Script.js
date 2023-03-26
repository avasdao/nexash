/* Import types. */
// import BlankType from './Blank.js'

import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLString,
} from 'graphql'

export default new GraphQLInputObjectType({
    name: 'Script',
    fields: () => ({

        opcode: {
            type: new GraphQLList(GraphQLInt),
            description: `Holds an array of Operation Codes (Op_Codes).`,
        },

    }),
    description: `A __Script__ allows for programmable blockchain functions.`,
})
