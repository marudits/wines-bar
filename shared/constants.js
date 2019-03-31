const CONSTANTS = {
    API: {
        WINES: {
            BASE_URL: 'https://www.winespectator.com/rss/rss?t=dwp'
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