/* Import types. */
// import BlankType from '../types/Blank.js'

import {
    GraphQLBoolean,
    GraphQLEnumType,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} from 'graphql'

const ChainIdType = new GraphQLEnumType({
    name: 'ChainId',
    values: {
        AVAX  : { value: 'AVAX'  },
        BSC   : { value: 'BSC'   },
        ETH   : { value: 'ETH'   },
        MATIC : { value: 'MATIC' },
        NEXA  : { value: 'NEXA'  },
        TRX   : { value: 'TRX'   },
    },
    description: `Select from one of the compatible __Meta Networks__ supported by NexaShell.`,
})

export default {
    type: new GraphQLList(GraphQLString),
    args: {
        chainid: {
            type: ChainIdType,
            description: `Specify the __Chain ID__ for your desired network.`,
        },

        request: {
            type: new GraphQLList(GraphQLString),
            description: `Provide serialized __Request(s)__ to be processed by Meta networks.`,
        },
    },
    resolve: (_root, args, ctx) => {
        console.log('MMeta (args):', args)

        return [JSON.stringify({
            field1: 'This is a META asset!',
            field2: 1337,
            field3: 88888888,
        })]
    },
    description: `Request _(unstructured)_ __Meta__ data from Networks outside of the Nexa Core blockchain _(incl. BSC, ETH and TRX)._`,
}
