export function getWineName(title = ''){
    return title.match(/[A-Z][A-Z]+/g).join(" ")
}

export function getWinePrice(title = ''){
    return title.split(" ").filter(x => x.indexOf('$') !== -1)[0];
}