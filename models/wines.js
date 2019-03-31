// library
const Parser = require('rss-parser');
const parser = new Parser();

// shared
const CONSTANTS = require('../shared/constants');

// utils
const Envelope = require('../utils/envelope');
const { getISODate, isAvailableToday, getWinesIdFromGuid } = require('../utils/string-formatter');

let data = {
    wines: {
        stocks: null,
        last_update_time: null,
        title: null,
        feed_url: null
    }
}

const wines = {
    getWines: async (req, res) => {
        const START_EXEC = process.hrtime();

        /*
         * only update stocks (call rss)
         * if last_update_time is on different (prev) day
         */
        if(data.wines.stocks && getISODate(data.wines.last_update_time) === getISODate()){
            res.status(200).json(new Envelope(true, data.wines.stocks, { exec_time: process.hrtime(START_EXEC), title: data.wines.title, feed_url: data.wines.feed_url }));
            return;
        }

        let payload = await parser.parseURL(CONSTANTS.API.WINES.BASE_URL)
            .then(res => {
                // update data
                data['wines'] = {
                    stocks: res.items,
                    last_update_time: new Date().getTime(),
                    title: res.title,
                    feed_url: res.feedUrl
                };

                return res;
            })
            .catch(err => {
                console.error(`Failed on fetch wine rss: `, err);
                return null;
            });

        res.status(payload !== null ? 200 : 500).json(new Envelope(payload !== null, payload !== null ? data.wines.stocks : { message: CONSTANTS.RESPONSE.CODE['500']} , { exec_time: process.hrtime(START_EXEC), title: data.wines.title, feed_url: data.wines.feed_url }));
    },
    getWineDetails: (req, res) => {
        const START_EXEC = process.hrtime();

        const { id } = req.params;
        
        if(!id){
            res.status(400).json(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'], details: `Requires wines(ids) as request params` }, { exec_time: process.hrtime(START_EXEC) }));
            return;
        }

        let payload = data.wines.stocks.filter(x => getWinesIdFromGuid(x.guid) === id);

        res.status(payload && payload.length > 0 !== null ? 200 : 404).json(new Envelope(payload && payload.length > 0, payload && payload.length > 0 ? payload : { message: CONSTANTS.RESPONSE.CODE['404']} , { exec_time: process.hrtime(START_EXEC), title: data.wines.title, feed_url: data.wines.feed_url }));
    },
    orderWines: (req, res) => {
        const START_EXEC = process.hrtime();

        let { wines } = req.body;

        if(!wines){
            res.status(400).json(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'], details: `Requires wines(ids) as request body` }, { exec_time: process.hrtime(START_EXEC) }));
            return;
        }

        let orderedWinesId = wines.split(','), orderedWines = [];

        for(let wine of data.wines.stocks){
            if(orderedWinesId.indexOf(getWinesIdFromGuid(wine.guid)) !== -1){
                orderedWines.push(Object.assign({}, wine, {
                    isAvailableToday: isAvailableToday(wine.isoDate)
                }))
            }
        }
        
        res.status(200).json(new Envelope(true, orderedWines, { exec_time: process.hrtime(START_EXEC) }));
    }
}

module.exports = wines;