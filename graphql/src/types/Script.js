/* Import types. */
// import BlankType from './Blank.js'

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
    name: 'Script',
    fields: () => ({

        opcode: {
            type: new GraphQLList(GraphQLInt),
            description: `Holds an array of Operation Codes (Op_Codes).`,
        },

    }),
    description: `A __Script__ allows for programmable blockchain functions.`,
})
