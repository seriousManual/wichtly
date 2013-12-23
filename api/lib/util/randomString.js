function createRandomString(length) {
    var a = 'abcdefghijklmnopqrstuvxyz0123456789';
    var newString = '';

    while(newString.length < length) {
        newString += a.substr(parseInt(Math.random() * a.length, 10), 1);
    }

    return newString;
}

module.exports = createRandomString;