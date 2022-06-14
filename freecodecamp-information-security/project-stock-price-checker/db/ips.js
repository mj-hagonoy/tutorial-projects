let ips = [];
let _ipMap = {};

const Reset = () => {
    ips = [];
    _ipMap = {};
}

const Save = ({ip, stock}) => {
    let id = `${ip}_${stock}`;
    if(_ipMap.hasOwnProperty(id)) return;
    _ipMap[id] = true;
    ips.push(id)
}

const GetLikeCount = (stock) => {
    let result = {};
    result[stock] = (ips.filter((id) => id.includes(stock)) || []).length
    return result;
}

const GetRelLikeCount = (stock1, stock2) => {
    like1 = GetLikeCount(stock1);
    like2 = GetLikeCount(stock2);

    let result = {};
    result[stock1] = like1[stock1] - like2[stock2];
    result[stock2] = like2[stock2] - like1[stock1];
    return result;
}

module.exports = {Save, GetLikeCount, GetRelLikeCount, Reset}


