/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'

/* Initialize databases. */
const contractsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/contracts`)
const scriptTxsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/script_txs`)
const systemDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/system`)

/* Import handlers. */
// import handleNulldata from '../handlers/nulldata.js'

/* Import helpers. */
// import getBlock from '../utils/getBlock.js'
// import getTransaction from '../utils/getTransaction.js'

const ENDPOINT = 'https://nexa.sh/graphql'


/**
 * Lookup Metadata
 */
const lookupMeta = async (_scriptHash) => {
console.log('SCRIPT HASH', _scriptHash);
    /* Initialize locals. */
    let contract
    let query
    let result

    /* Build (graphql) query. */
    query = `
    {
        script(hash: "${_scriptHash}") {
          pageInfo {
            metadata
          }
        }
      }
    `
console.log('SCRIPT HASH (query):', query)

    /* Make query request. */
    result = await fetch(ENDPOINT,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query }),
        })
        .catch(err => console.error(err))

    /* Decode JSON. */
    result = await result.json()
    console.log('SCRIPT HASH (result):', result)

    if (result?.data?.script?.pageInfo?.metadata) {
        contract = result.data.script.pageInfo.metadata
    }
    // console.log('CONTRACT', contract)

    /* Validate contract. */
    if (contract) {
        try {
            /* Set contract details. */
            contract = JSON.parse(contract)
        } catch (err) {
            console.error(err)
        }
    } else {
        contract = {
            title: 'Unknown',
            bannerUrl: 'https://bafybeiczbkrgxen6fbwspengdxke4c65tggy2h7uo4dxdf22hnevru5f6e.nexa.garden',
            iconUrl: 'https://bafkreic4porzvnv5xbgqhh7bxiomkhld2zvh5xgd22oxefuda4bvdla5fq.nexa.garden',
            version: '',
            type: '',
        }
    }

    /* Return contract. */
    return contract
}

/**
 * Load Unique
 */
const loadUnique = async (_scripts) => {
    /* Validate scripts. */
    if (!_scripts) {
        return []
    }

    // const contracts = {}
    let unique = {}

    /* Handle scripts. */
    for (let i = 0; i < _scripts.length; i++) {
        /* Set script. */
        const script = _scripts[i]

        /* Set transaction idem. */
        const txidem = script.txidem

        /* Set timestamp. */
        const timestamp = script?.time

        /* Set outputs. */
        const outputs = script.vout

        /* Handle outputs. */
        // for (let j = 0; j < _scripts.length; j++) {
        for (let j = 0; j < outputs.length; j++) {
            const output = outputs[j]

            if (!output || output === null || typeof output === 'undefined') {
                continue
            }

            if (output?.scriptPubKey.scriptHash === null) {
                continue
            }

            if (output?.scriptPubKey.scriptHash === 'pay2pubkeytemplate') {
                continue
            }

            let meta
            let scriptHash

            /* Set script hash. */
            scriptHash = output.scriptPubKey.scriptHash

            if (!unique[scriptHash]) {
                // lookupMeta(scriptHash)

                // if (unique[scriptHash].count > 10) {
                    meta = await lookupMeta(scriptHash)
                // }
                console.log('META', meta)

                unique[scriptHash] = {
                    title: meta.title,
                    bannerUrl: meta.bannerUrl,
                    iconUrl: meta.iconUrl,
                    version: meta.version,
                    type: meta.type,
                    timestamp,
                    count: 1,
                }
            } else {
                if (!unique[scriptHash][txidem]) {
                    /* Set flag. */
                    unique[scriptHash][txidem] = true

                    /* Increment (unique transaction) count. */
                    unique[scriptHash].count++
                }

                if ((unique[scriptHash].timestamp === null && timestamp) || (timestamp && timestamp > unique[scriptHash].timestamp)) {
                    unique[scriptHash].timestamp = timestamp
                    // console.log('setting', scriptHash, timestamp)
                }
            }
        }
    }

    /* Return unique (object). */
    return unique
}


/**
 * Check Database Syncronization
 *
 * Performs a check to make sure we have indexed up to the
 * latest block height.
 */
;(async () => {
    console.info('\n  Starting CONTRACTS database sync...\n')

    /* Initialize locals. */
    let block
    let limit
    let nightlySummary
    let nightlyTxs
    let scriptTxs
    let startkey
    let totalNightly
    let tx
    let txidem
    let updatedSystem

    // startkey = moment().subtract(1, 'days').unix()
    startkey = moment().subtract(9, 'hours').unix()
    console.log('START KEY', startkey)

    const yr = moment().year()
    const mo = moment().month()
    const dy = moment().day()

    const today = moment()
        .utc()
        .year(yr)
        .month(mo)
        .day(dy)
        .hour(0)
        .minute(0)
        .second(0)
        .unix()
    console.log('TODAY', today)

    // startkey = today

    limit = 2

    /* Request null data index. */
    nightlyTxs = await scriptTxsDb
        .query('api/byBlocktime', {
            startkey,
            limit,
            include_docs: true,
        })
        .catch(err => console.error(err))
    console.log('NIGHTLY TXS', nightlyTxs)

    if (nightlyTxs && nightlyTxs.total_rows && nightlyTxs.offset) {
        totalNightly = nightlyTxs.total_rows - nightlyTxs.offset
        console.log('TOTAL NIGHTLY', totalNightly)
    }

    // const nightlyKeys = nightlyTxs?.rows.map(_row => {
    //     return _row.id
    // })
    // console.log('NIGHTLY KEYS', nightlyKeys)

    /* Request null data index. */
    // nightlyTxs = await scriptTxsDb
    //     .allDocs({
    //         keys: nightlyKeys,
    //         include_docs: true,
    //     })
    //     .catch(err => console.error(err))

    /* Validate (nightly) transactions. */
    if (nightlyTxs?.rows) {
        nightlyTxs = nightlyTxs.rows.map(_tx => {
            return _tx.doc
        })
    }
    console.log('NIGHTLY TXS', nightlyTxs)

    nightlyTxs = await loadUnique(nightlyTxs)
    console.log('LOAD UNIQUE', nightlyTxs)

return
    /* Retrieve (latest) System status. */
    nightlySummary = await contractsDb
        .get('2024_07_24')
        .catch(err => console.error(err))
    console.log('NIGHTLY SUMMARY', nightlySummary)

    /* Set new indexed height. */
    // updatedSystem.last = i
    nightlySummary.updatedAt = moment().unix()

    /* Save (updated) System status to storage. */
    await contractsDb
        .put(updatedSystem)
        .catch(err => console.error(err))
})()
