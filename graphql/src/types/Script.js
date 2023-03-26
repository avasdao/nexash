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
            type: new GraphQLNonNull(new GraphQLList(GraphQLInt)),
            description: `Holds an array of Operation Codes (Op_Codes).`,
        },

    }),
    description: `A __Script__ allows for programmable blockchain functions.`,
})
