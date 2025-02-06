/* Import modules. */
import { GraphQLEnumType } from 'graphql'

export default new GraphQLEnumType({
    name: 'AddressType',
    values: {
        P2PKH: {
            value: 'P2PKH',
            description: `Type ID is __0__`,
        },

        SCRIPT: {
            value: 'SCRIPT',
            description: `Type ID is __1<<3 | 0x08 | 8__`,
        },

        TEMPLATE: {
            value: 'TEMPLATE',
            description: `Type ID is __19<<3 | 0xC8 | 200__`,
        },

        GROUP: {
            value: 'GROUP',
            description: `Type ID is __11<<3 | 0x88 | 136__`,
        },
    },
    description: `Select from one of the compatible __Address Types__ supported by the Nexa protocol.`,
})
