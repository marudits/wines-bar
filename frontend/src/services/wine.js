// library
import * as request from 'superagent';

// shared
const CONSTANTS = require('../shared/constants'); 

export const wineService ={
    getWineList: () => {
        const URL = `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.WINES.ROOT}`;
        return request.get(URL)
    },
    getWineDetails: (id) => {
        const URL = `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.WINES.ROOT}/${id}`;
        return request.get(URL)
    },
    orderWines: (payload) => {
        const URL = `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.WINES.ROOT}`;
        return request.post(URL).send({ wines: payload })
    }
}