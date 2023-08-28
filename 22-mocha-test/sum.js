module.exports = function (...rest) {
    let sum = 0;
    for(let m of rest) {
        sum+=m;
    }
    return sum;
};