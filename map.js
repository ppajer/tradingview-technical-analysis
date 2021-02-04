const indicators = {
    'Recommend.Other': {
        signal: 'Recommend',
        args: [0]
    },
    'Recommend.All': {
        signal: 'Recommend',
        args: [1]
    },
    'Recommend.MA': {
        signal: 'Recommend',
        args: [2]
    },
};

const resolutionParams = {
    '1m': '1',
    '5m': '5',
    '15m': '15',
    '1h': '60',
    '4h': '240',
    '1D': '',
    '1W': '1W',
    '1M': '1M'
}

module.exports.indicatorToSignal = (indicator) => indicators[indicator];

module.exports.resolutionToParam = (resolution) => resolutionParams[resolution];