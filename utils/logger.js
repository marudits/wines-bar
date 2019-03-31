const fs = require('fs');
const path = require('path');

// shared
const CONSTANTS = require('../shared/constants');

function logger(text){
    const log = `${new Date().toISOString()} | ${text}\n`;
    fs.appendFile(path.join(__dirname, '../', CONSTANTS.LOG.FILENAME), log, (err) => {
        if (err) {
            console.error('Failed on ');
        }
    });
}

module.exports = {
    logger
}