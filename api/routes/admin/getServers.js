/* Import modules. */
const util = require('util')
const PouchDB = require('pouchdb')

/* Initialize databases. */
const serversDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/servers`)

/**
 * Get Servers
 */
const getServers = async (res) => {
    let data

    /* Request existing user. */
    results = await serversDb
        .query('api/bySite', {
            include_docs: true,
        })
        .catch(err => {
            console.error('DATA ERROR:', err)
        })
    console.log('SERVERS RESULT (bySite)', util.inspect(results, false, null, true))

    /* Validate data. */
    if (results && results.rows.length !== 0) {
        /* Map data (doc) entries. */
        data = results.rows.map(_entry => {
            return _entry.doc
        })
    }

    /* Send  data response to client. */
    res.json(data)
}

/* Export module. */
module.exports = getServers
