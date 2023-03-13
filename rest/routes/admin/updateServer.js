/* Import modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const util = require('util')

/* Initialize databases. */
const serversDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/servers`)

/**
 * Update Server
 */
const updateServer = async (res, _body) => {
    const updatedAt = moment().unix()

    const pkg = {
        ..._body.server,
        updatedAt,
    }
    console.log('UPDATE SERVER (pkg):', pkg);

    /* Update existing server. */
    const results = await serversDb
        .put(pkg)
        .catch(err => {
            console.error('DATA ERROR:', err)
        })
    console.log('SERVER RESULT (byId)', util.inspect(results, false, null, true))

    /* Send  data response to client. */
    res.json(results)
}

/* Export module. */
module.exports = updateServer
