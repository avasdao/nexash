/* Import modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const util = require('util')

/* Initialize databases. */
const minersDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/miners`)

/**
 * Update Miner
 */
const updateMiner = async (res, _body) => {
    const updatedAt = moment().unix()

    const pkg = {
        ..._body.miner,
        updatedAt,
    }
    console.log('UPDATE MINER (pkg):', pkg);

    /* Update existing miner. */
    const results = await minersDb
        .put(pkg)
        .catch(err => {
            console.error('DATA ERROR:', err)
        })
    console.log('MINER RESULT (byId)', util.inspect(results, false, null, true))

    /* Send  data response to client. */
    res.json(results)
}

/* Export module. */
module.exports = updateMiner
