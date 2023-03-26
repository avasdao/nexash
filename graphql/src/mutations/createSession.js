/* Import modules. */
import { v4 as uuidv4 } from 'uuid'

/* Import types. */
import SessionType from '../types/Session.js'

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

export default {
    type: SessionType,
    args: {
        address: {
            type: GraphQLString,
            description: `Provide an __Address__ to identify your new Session.`,
        },

        sessionid: {
            type: GraphQLString,
            description: `Provide your own __Session ID__ to identify your new Session.\n__NOTE:__ This MUST be a unique _(random)_ value in __UUID v4__ format or you will receive an error.`,
        },
    },
    resolve: (_root, args, ctx) => {
        console.log('SESSION ARGS:', args)

        /* Initialize holders. */
        let errors = []
        let sessionid = ''

        /* Create a new Session ID. */
        sessionid = uuidv4()

        return {
            errors,
            sessionid,
        }
    },
    description: `Create a new __Session__ for managing your authenticated requests to NexaShell data services.`,
}
