/* Import modules. */
const util = require('util')
const PouchDB = require('pouchdb')

/* Initialize databases. */
const ordersDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/orders`)

/**
 * Get Orders
 */
const getOrders = async (res) => {
    let data

    /* Request existing user. */
    results = await ordersDb
        .query('api/byAddress', {
            include_docs: true,
        })
        .catch(err => {
            console.error('DATA ERROR:', err)
        })
    console.log('ORDERS RESULT (byAddress)', util.inspect(results, false, null, true))

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
module.exports = getOrders
