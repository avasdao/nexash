/* Import types. */
import BlockType from '../types/Block.js'

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

export default (_pubsub) => ({
    type: BlockType,
    // args: {
    //     fieldName: {
    //         type: GraphQLString,
    //         description: `Field description goes here.`,
    //     },
    // },
    subscribe: () => _pubsub.asyncIterator(['NEW_BLOCK']),
    description: `This subscription will report __every new block__ that appears on the blockchain.`,
})
