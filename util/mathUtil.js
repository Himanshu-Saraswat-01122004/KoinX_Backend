const calculateStandardDeviation = (data) => {
    const n = data.length;
    const mean = data.reduce((sum, value) => sum + value, 0) / n;
    const variance = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / n;
    return Math.sqrt(variance);
};

module.exports = calculateStandardDeviation;