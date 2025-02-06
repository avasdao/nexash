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

export default new GraphQLObjectType({
    name: 'Reward',
    fields: () => ({

        rewardid: {
            type: GraphQLString,
            description: `TBD`,
        },

        affiliateid: {
            type: GraphQLString,
            description: `TBD`,
        },

        amount: {
            type: GraphQLInt,
            description: `TBD`,
        },

        dateCreated: {
            type: GraphQLInt,
            description: `TBD`,
        },
        
    }),
    description: `A __Reward__ is earned from the effort(s) of an Affiliate.`,
})
