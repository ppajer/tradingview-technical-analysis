const axios = require('axios');
const indicators = require('./indicators');
const { resolutionToParam } = require('./map');
const requestUrl = 'https://scanner.tradingview.com/crypto/scan';

module.exports = async (ticker, resolution) => {
    resolution = resolutionToParam(resolution);
    const requestBody = {
        "symbols":{
            "tickers":[
                ticker
            ],
            "query": {
                "types":[]
            }
        },"columns": indicators.map(e => resolution ? e+=`|${resolution}` : e)
    };
    try {
        const response = await axios.post(requestUrl, requestBody);
        if (response.data.data.length) {
            return response.data.data[0].d;
        }
        return response.data.data;
    } catch (e) {
        console.error(e)
        return [];
    }
}