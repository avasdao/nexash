/* Import modules. */
import { GraphQLEnumType } from 'graphql'

export default new GraphQLEnumType({
    name: 'NetworkId',
    values: {
        AVAX: {
            value: 'AVAX',
            description: `[__Avalanche__](https://www.avax.com/) — Largest network of decentralized Validators.`,
        },

        BCH: {
            value: 'BCH',
            description: `[__Bitcoin Cash__](https://bitcoincash.org/) — The leading provider of peer-to-peer electronic cash solutions.`,
        },

        BSC: {
            value: 'BSC',
            description: `[__BNB Smart Chain__](https://www.bnbchain.org/) _(from Binance)_ — Largest centralized exchange (CEX).`,
        },

        BTC: {
            value: 'BTC',
            description: `[__Bitcoin__](https://bitcoin.org/) — The "original" innovation that introduced a new form of "digital gold".`,
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
            description: `[__Nexa + Metanet__](https://nexa.org/) — Global asset/value scaling on L1 _(Core)_ up to 100k/sec, plus 100% EVM compatiblity on L2 _(Metanet)._`,
        },

        TRX: {
            value: 'TRX',
            description: `[__Tron__](https://tron.network/) — Leading "legal tender" provider in the Caribbean.`,
        },

        XMR: {
            value: 'XMR',
            description: `[__Monero__](https://www.getmonero.org/) — Private, decentralized cryptocurrency that keeps your finances confidential and secure.`,
        },

        ZEC: {
            value: 'ZEC',
            description: `[__Zcash__](https://z.cash/) — Zcash is a digital currency: fast and confidential with low fees.`,
        },
    },
    description: `Select from one of the compatible __Meta Networks__ supported by NexaShell.`,
})
