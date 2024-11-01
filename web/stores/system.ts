/* Import modules. */
import { defineStore } from 'pinia'
import numeral from 'numeral'

/**
 * System Store
 */
export const useSystemStore = defineStore('system', {
    state: () => ({
        /* Set constants. */
        ONE_SAT: BigInt('1'),
        ONE_NEX: BigInt('100'),
        ONE_KEX: BigInt('100000'),
        ONE_MEX: BigInt('100000000'),
        ONE_META: BigInt('1000000000000000000'),

        EXCHANGE_ENDPOINT: 'https://api.telr.io/v1',
        TICKER_UPDATE_INTERVAL: 30000, // default: 30 seconds

        /* Initialize notifications. */
        _notif: {
            isShowing: false,
            icon: null,
            title: null,
            description: null,
            delay: 7000,
        },

        /**
         * Application Starts
         */
        _appStarts: 0,

        /**
         * Application Version
         */
        _appVersion: null,

        /**
         * Flags
         *
         * 1. Dark mode
         * 2. Unconfirmed transactions
         */
        _flags: null,

        /**
         * Locale
         *
         * Controls the localization language.
         * (default is english)
         */
        _locale: null,

        /**
         * Notices
         *
         * System notices that nag/remind the user of some important action or
         * information; which can be permanently disabled ("Do Not Show Again")
         * via checkbox and confirmation.
         *
         * NOTE: Unique 1-byte (hex) codes (up to 255) are used to reduce the size
         *       of this storage field.
         */
        _notices: null,

        _ticker: null,
    }),

    getters: {
        ticker() {
            return this._ticker
        },

        price() {
            if (this.ticker) {
                return this.ticker.quote.USD.price
            }
        },

        priceDisplay() {
            if (this.price) {
                return numeral(this.price * 1000000.0).format('$0,0.00[00')
            }
        },

    },

    actions: {
        /**
         * Initialize Application
         *
         * Performs startup activities.
         */
        init() {
            this._appStarts++

            /* Start ticker update (interval). */
            setInterval(this.updateTicker, this.TICKER_UPDATE_INTERVAL)

            /* Update ticker. */
            this.updateTicker()
        },

        async updateTicker () {
            this._ticker = await $fetch(this.EXCHANGE_ENDPOINT + '/ticker/quote/NEXA')
                .catch(err => console.error)
            // console.log('TICKER', this.ticker)
        },

    },
})
