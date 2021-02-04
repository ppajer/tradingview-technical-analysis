const indicators = require('./indicators');
const { indicatorToSignal } = require('./map');

const signals = {
    STRONG_BUY: 'STRONG_BUY',
    BUY: 'BUY',
    NEUTRAL: 'NEUTRAL',
    SELL: 'SELL',
    STRONG_SELL: 'STRONG_SELL'
}

const exists = (indicators, data) => {
    if (!data.length) return false; 
    for (let i = 0; i < indicators.length; i++) {
        if (typeof data[indicators[i]] === 'undefined' || data[indicators[i]] === null) return false;
    }
    return true;
}

const compute = {
    MA: function(e, t) {
        var o = signals.NEUTRAL;
        return e < t && (o = signals.BUY), e > t && (o = signals.SELL), o
    },
    RSI: function(e, t) {
        var o = signals.NEUTRAL;
        return e < 30 && t > e && (o = signals.BUY), e > 70 && t < e && (o = signals.SELL), o
    },
    Stoch: function(e, t, o, r) {
        var i = signals.NEUTRAL;
        return e < 20 && t < 20 && e > t && o < r && (i = signals.BUY), e > 80 && t > 80 && e < t && o > r && (i = signals.SELL), i
    },
    CCI20: function(e, t) {
        var o = signals.NEUTRAL;
        return e < -100 && e > t && (o = signals.BUY), e > 100 && e < t && (o = signals.SELL), o
    },
    ADX: function(e, t, o, r, i) {
        var a = signals.NEUTRAL;
        return e > 20 && r < i && t > o && (a = signals.BUY), e > 20 && r > i && t < o && (a = signals.SELL), a
    },
    AO: function(e, t) {
        var o = signals.NEUTRAL;
        return (e > 0 && t < 0 || e > 0 && t > 0 && e > t) && (o = signals.BUY), (e < 0 && t > 0 || e < 0 && t < 0 && e < t) && (o = signals.SELL), o
    },
    Mom: function(e, t) {
        var o = signals.NEUTRAL;
        return e < t && (o = signals.BUY), e > t && (o = signals.SELL), o
    },
    MACD: function(e, t) {
        var o = signals.NEUTRAL;
        return e > t && (o = signals.BUY), e < t && (o = signals.SELL), o
    },
    BBBuy: function(e, t) {
        var o = signals.NEUTRAL;
        return e < t && (o = signals.BUY), o
    },
    BBSell: function(e, t) {
        var o = signals.NEUTRAL;
        return e > t && (o = signals.SELL), o
    },
    PSAR: function(e, t) {
        var o = signals.NEUTRAL;
        return e < t && (o = signals.BUY), e > t && (o = signals.SELL), o
    },
    Recommend: function(e) {
        var t = signals.NEUTRAL;
        return e >= -1 && e < -.5 && (t = signals.STRONG_SELL), e >= -.5 && e < 0 && (t = signals.SELL), 0 === e && (t = signals.NEUTRAL), e > 0 && e <= .5 && (t = signals.BUY), e > .5 && e <= 1 && (t = signals.STRONG_BUY), t
    },
    Simple: function(e) {
        var t = signals.NEUTRAL;
        return -1 === e && (t = signals.SELL), 1 === e && (t = signals.BUY), t
    }
}

const getSignals = (result) => indicators.reduce((all, current) => {
    const map = indicatorToSignal(current);
    if (exists(map.args, result.value)) {
        const signalData = map.args.map(i => result.value[i]);
        const computeFunction = compute[map.signal];
        all[current] = computeFunction(...signalData);
    }
    return all;
}, {})

module.exports = {
    getSignals
}