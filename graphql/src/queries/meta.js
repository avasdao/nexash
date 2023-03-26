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
            description: `[__Avalanche__](https://www.avax.com/) — Largest network of decentralized Validators.`,
        },

        BSC: {
            value: 'BSC',
            description: `[__BNB Smart Chain__](https://www.bnbchain.org/) _(from Binance)_ — Largest centralized exchange.`,
        },

        ETH: {
            value: 'ETH',
            description: `[__Ethereum__](https://ethereum.org/) — Leading provider of decentralized computing.`,
        },

        MATIC: {
            value: 'MATIC',
            description: `[__Polygon__](https://polygon.technology/) — Leading provider of scalable, on-chain asset exchange.`,
        },

        NEXA: {
            value: 'NEXA',
            description: `[__Nexa + Metanet__](https://nexa.org/) — Global asset/value scaling on L1 up to 100k/sec, with 100% EVM compatiblity on L2.`,
        },

        TRX: {
            value: 'TRX',
            description: `[__Tron__](https://tron.network/) — Leading "legal tender" provider in the Caribbean.`,
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
