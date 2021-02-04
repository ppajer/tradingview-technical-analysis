const request = require('./request.js');
const { getSignals } = require('./signals.js');
let computed;
let queueIds;
let requestQueue;

const processData = (results) => {
    for (const ticker in computed) {
        const item = computed[ticker];
        for (const resolution in queueIds[ticker]) {
                const id = queueIds[ticker][resolution];
                item.signals[resolution] = getSignals(results[id])
        }
    }

    return computed;
}

const analyze = async (tickers, resolutions) => {
    
    requestQueue = [];
    queueIds = {};
    computed = {};

    tickers.map(ticker => {
        computed[ticker] = {signals: {}};
        queueIds[ticker] = {};
        resolutions.map(resolution => {
            queueIds[ticker][resolution] = requestQueue.push(request(ticker, resolution)) - 1;
        })
    })

    return processData(await Promise.allSettled(requestQueue));
}

module.exports = analyze;