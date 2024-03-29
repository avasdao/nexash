/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const blocksDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/blocks`)
const systemDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/system`)

export default defineEventHandler(async (event) => {
    let blocks
    let response
    let system

    system = await systemDb
        .get('idxBlocks')
        .catch(err => console.error(err))
    console.log('SYSTEM', system)

    if (!system) {
        return []
    }

    response = await blocksDb
        .query('api/byHeight', {
            startkey: system.last,
            endkey: system.last - 99,
            descending: true,
            include_docs: true,
        })
        .catch(err => console.error(err))
    console.log('RESPONSE', response)
    // console.log('RESPONSE', response.rows.length, response.rows[0].doc.height, response.rows[response.rows.length-1].doc.height)

    blocks = response.rows.map(_row => {
        return _row.doc
    })

    blocks = blocks.sort((a, b) => {
        return b.height - a.height
    })

    /* Return token details. */
    return blocks || []
})
