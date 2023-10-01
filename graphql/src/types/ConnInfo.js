/* Import types. */
// import ConnInfoType from './ConnInfo.js'

import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} from 'graphql'

/* Import types. */
import ProfileType from '../types/Profile.js'

export default new GraphQLObjectType({
    name: 'ConnInfo',
    fields: () => ({

        profiles: {
            type: new GraphQLList(ProfileType),
            description: `TBD`,
        },

        updatedAt: {
            type: GraphQLInt,
            description: `TBD`,
        },

    }),
    description: `A __ConnInfo__ description goes here.`,
})
