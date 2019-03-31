const CONSTANTS = {
    API: {
        WINES: {
            BASE_URL: 'https://www.winespectator.com/rss/rss?t=dwp'
        }
    },
    LOG: {
        FILENAME: 'app-logs.log',
        ACTIONS: {
            WINE: {
                DETAILS: 'WINE_DETAILS',
                LIST: 'WINE_LIST',
                ORDER: 'WINE_ORDER'
            }
        }
    },
    RESPONSE: {
        CODE: {
            400: 'INVALID_DATA',
            401: 'UNAUTHORIZED',
            404: 'NOT_FOUND',
            500: 'INTERNAL_SERVER_ERROR'
        }
    }
}

module.exports = CONSTANTS;