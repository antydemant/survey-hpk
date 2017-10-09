var crypto = require('crypto');

var cryptos = function md5(data) {
    return crypto.createHash('md5').update(data).digest('hex');
};

module.exports =  cryptos;