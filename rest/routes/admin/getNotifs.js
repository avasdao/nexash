/* Import modules. */
const util = require('util')
const PouchDB = require('pouchdb')

/* Initialize databases. */
const notifsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/notifs`)

/**
 * Get Notifications
 */
const getNotifs = async (res) => {
    let data

    /* Request existing user. */
    results = await notifsDb
        .query('api/byType', {
            include_docs: true,
        })
        .catch(err => {
            console.error('DATA ERROR:', err)
        })
    console.log('NOTIFS RESULT (byType)', util.inspect(results, false, null, true))

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
module.exports = getNotifs
