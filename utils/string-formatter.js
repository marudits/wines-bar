function getISODate(timestamp = new Date().getTime()){
    return new Date(timestamp).toISOString().slice(0, 10);
}

function isAvailableToday(availableDate = null){
    return getISODate(availableDate) === getISODate();
}

function getWinesIdFromGuid(guidUrl = ''){
    return guidUrl.split('/')[guidUrl.split('/').length - 1];
}

module.exports = {
    getISODate,
    isAvailableToday,
    getWinesIdFromGuid
}