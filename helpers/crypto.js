

module.exports.md5 = function md5(data) {
    return crypto.createHash('md5').update(data).digest('hex');
};