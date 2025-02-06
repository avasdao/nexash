/* Import types. */
// import BlankType from './Blank.js'

import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLString,
} from 'graphql'

export default new GraphQLInputObjectType({
    name: 'Script',
    fields: () => ({

        opcode: {
            type: new GraphQLList(GraphQLInt),
            description: `Holds an array of Operation Codes __(Op_Codes).__`,
        },

        hex: {
            type: new GraphQLList(GraphQLString),
            description: `Holds one or more full __HEX__ string(s).`,
        },

    }),
    description: `A __Script__ allows for programmable blockchain functions.`,
})
