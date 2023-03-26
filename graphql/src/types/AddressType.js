/* Import modules. */
import { GraphQLEnumType } from 'graphql'

export default new GraphQLEnumType({
    name: 'AddressType',
    values: {
        P2PKH: {
            value: 'P2PKH',
            description: `Type ID is 0.`,
        },

        SCRIPT: {
            value: 'SCRIPT',
            description: `Type ID is 1<<3.`,
        },

        TEMPLATE: {
            value: 'TEMPLATE',
            description: `Type ID is 19<<3.`,
        },

        GROUP: {
            value: 'GROUP',
            description: `Type ID is 11<<3.`,
        },
    },
    description: `Select from one of the compatible __Address Types__ supported by the Nexa protocol.`,
})
