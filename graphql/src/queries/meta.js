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
        AVAX: {
            value: 'AVAX',
            description: `Avalanche — [https://www.avax.com/](https://www.avax.com/)`,
        },

        BSC: {
            value: 'BSC',
            description: `BNB Smart Chain _(from Binance)_ — [https://www.bnbchain.org/](https://www.bnbchain.org/)`,
        },

        ETH: {
            value: 'ETH',
            description: `Ethereum — [https://ethereum.org/](https://ethereum.org/)`,
        },

        MATIC: {
            value: 'MATIC',
            description: `Polygon — [https://polygon.technology/](https://polygon.technology/)`,
        },

        NEXA: {
            value: 'NEXA',
            description: `Nexa — [https://nexa.org/](https://nexa.org/)`,
        },

        TRX: {
            value: 'TRX',
            description: `Tron — [https://tron.network/](https://tron.network/)`,
        },
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
    description: `Request _(unstructured)_ __Meta__ data from Networks outside of the Nexa Core blockchain _(incl. Binance, Ethereum and Tron)._`,
}
