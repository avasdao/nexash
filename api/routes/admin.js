/* Import modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const superagent = require('superagent')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

const { Magic } = require('@magic-sdk/admin')

const magicAdmin = new Magic(process.env.MAGIC_LINK_KEY)

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/logs`)
const minersDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/miners`)
const profilesDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/profiles`)
const serversDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/servers`)

/**
 * Administration Module
 */
const admin = async function (req, res) {
    let account
    let action
    let body
    let createdAt
    let data
    let didToken
    let email
    let id
    let issuer
    let metadata
    let pkg
    let results
    let updatedAt

    try {
        body = req.body
        console.log('BODY', body)

        /* Validate body. */
        if (body) {
            id = uuidv4()
            createdAt = moment().unix()

            pkg = {
                _id: id,
                src: 'magic',
                ...body,
                createdAt,
            }

            results = await logsDb
                .put(pkg)
                .catch(err => console.error('LOGS ERROR:', err))
        }

        /* Set DID token. */
        didToken = body.didToken
        // console.log('DID Token', didToken)

        if (!didToken) {
            /* Set status. */
            res.status(400)

            /* Return error. */
            return res.json({
                error: 'Missing DID token.'
            })
        }

        /* Set issuer. */
        issuer = magicAdmin.token.getIssuer(didToken)
        // console.log('ISSUER', issuer)

        /* Set (public) account/address. */
        account = magicAdmin.token.getPublicAddress(didToken)
        // console.log('ACCOUNT', account)

        if (!account) {
            /* Set status. */
            res.status(400)

            /* Return error. */
            return res.json({
                error: 'Missing user (account) address.'
            })
        }

        /* Set issuer metadata. */
        metadata = await magicAdmin.users.getMetadataByIssuer(issuer)
        // console.log('MAGIC LOGIN (data):', JSON.stringify(metadata, null, 4))

        /* Set email address. */
        email = metadata.email

        if (!email) {
            /* Set status. */
            res.status(400)

            /* Return error. */
            return res.json({
                error: 'Missing user email.'
            })
        }

        /* Validate (authorized) administrator. */
        if (
            email !== 'info@avasdao.org' &&
            email !== 'info@modenero.com' &&
            email !== 's.prince@modenero.com'
        ) {
            /* Set status. */
            res.status(401)

            /* Return error. */
            return res.json({
                error: 'You are NOT authorized to be here!'
            })
        }

        /* Set action. */
        action = body.action

        /* Validate action. */
        if (!action) {
            /* Set status. */
            res.status(400)

            /* Return error. */
            return res.json({
                error: 'Missing an action.'
            })
        }

        if (action === 'get_miners') {
            return require('./admin/getMiners')(res, body)
        }

        if (action === 'get_notifs') {
            return require('./admin/getNotifs')(res)
        }

        if (action === 'get_orders') {
            return require('./admin/getOrders')(res)
        }

        if (action === 'get_servers') {
            return require('./admin/getServers')(res)
        }

        if (action === 'get_miner') {
            minerid = body.minerid

            /* Request existing user. */
            results = await minersDb
                .get(minerid, {
                    include_docs: true,
                })
                .catch(err => {
                    console.error('DATA ERROR:', err)
                })
            console.log('MINER RESULT (byId)', util.inspect(results, false, null, true))

            return res.json(results)
        }

        if (action === 'get_profile') {
            /* Request existing user. */
            results = await profilesDb
                .get(body.profileid, {
                    include_docs: true,
                })
                .catch(err => {
                    console.error('DATA ERROR:', err)
                })
            console.log('PROFILE RESULT (byId)', util.inspect(results, false, null, true))

            return res.json(results)
        }

        if (action === 'get_profiles') {
            /* Request existing user. */
            results = await profilesDb
                .query('api/byNickname', {
                    include_docs: true,
                })
                .catch(err => {
                    console.error('DATA ERROR:', err)
                })
            console.log('PROFILES RESULT (byNickname)', util.inspect(results, false, null, true))

            /* Validate data. */
            if (results && results.rows.length !== 0) {
                /* Map data (doc) results. */
                data = results.rows.map(_profile => {
                    return _profile.doc
                })
            }

        }

        if (action === 'get_server') {
            serverid = body.serverid

            /* Request existing user. */
            results = await serversDb
                .get(serverid, {
                    include_docs: true,
                })
                .catch(err => {
                    console.error('DATA ERROR:', err)
                })
            console.log('SERVER RESULT (byId)', util.inspect(results, false, null, true))

            return res.json(results)
        }

        if (action === 'add_profile') {
            createdAt = updatedAt = moment().unix()

            // TODO: Validate `body.email`.

            pkg = {
                _id: uuidv4(),
                nickname: 'anon',
                createdAt,
                updatedAt,
            }

            /* Add new profile. */
            results = await profilesDb
                .put(pkg)
                .catch(err => {
                    console.error('DATA ERROR:', err)
                })
            console.log('PROFILES RESULT (add_profile)', util.inspect(results, false, null, true))
        }

        if (action === 'add_miner') {
            createdAt = updatedAt = moment().unix()

            pkg = {
                _id: uuidv4(),
                profileid: body.profileid,
                hostname: body.hostname,
                location: body.location,
                auth: body.auth,
                pid: body.pid,
                count: body.count,
                createdAt,
                updatedAt,
            }

            /* Add new profile. */
            results = await minersDb
                .put(pkg)
                .catch(err => {
                    console.error('DATA ERROR:', err)
                })
            console.log('MINERS RESULT (add_miner)', util.inspect(results, false, null, true))
        }

        if (action === 'add_server') {
            createdAt = updatedAt = moment().unix()

            pkg = {
                _id: body.location,
                siteid: body.siteid,
                hostname: body.hostname,
                auth: body.auth,
                cores: null,
                activeCores: 0,
                createdAt,
                updatedAt,
            }

            /* Add new server. */
            results = await serversDb
                .put(pkg)
                .catch(err => {
                    console.error('DATA ERROR:', err)
                })
            console.log('SERVERS RESULT (add_server)', util.inspect(results, false, null, true))
        }

        if (action === 'update_profile') {
            updatedAt = moment().unix()

            pkg = {
                ...body.profile,
                updatedAt,
            }
            console.log('UPDATE PROFILE (pkg):', pkg);
            /* Update existing profile. */
            results = await profilesDb
                .put(pkg)
                .catch(err => {
                    console.error('DATA ERROR:', err)
                })
            console.log('PROFILES RESULT (byId)', util.inspect(results, false, null, true))
        }

        if (action === 'update_miner') {
            return require('./admin/updateMiner')(res, body)
        }

        if (action === 'update_server') {
            return require('./admin/updateServer')(res, body)
        }

        /* Build (result) package. */
        pkg = {
            data,
            error: null,
            success: true,
            metadata,
        }

        /* Return params. */
        res.json(pkg)
    } catch (err) {
        console.error('ADMIN ERROR', err)

        return res.json(err)
    }
}

/* Export module. */
module.exports = admin
