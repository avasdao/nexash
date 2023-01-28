/* Import modules. */
const util = require('util')
const PouchDB = require('pouchdb')

/* Initialize databases. */
const minersDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/miners`)

/**
 * Get Miners
 */
const getMiners = async (res, _body) => {
    let data
    let profileid
    let serverid

    if (_body && _body.profileid) {
        profileid = _body.profileid

        /* Request existing user. */
        results = await minersDb
            .query('api/byProfile', {
                key: profileid,
                include_docs: true,
            })
            .catch(err => {
                console.error('DATA ERROR:', err)
            })
        console.log('MINERS RESULT (byProfile)', util.inspect(results, false, null, true))
    }

    if (_body && _body.serverid) {
        serverid = _body.serverid

        /* Request existing user. */
        results = await minersDb
            .query('api/byServer', {
                key: serverid,
                include_docs: true,
            })
            .catch(err => {
                console.error('DATA ERROR:', err)
            })
        console.log('MINERS RESULT (byServer)', util.inspect(results, false, null, true))
    }

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
module.exports = getMiners
