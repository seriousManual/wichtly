var URL_PATTERN = /(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/ig;
var LINEBREAK_PATTERN = /[\n]/g;

module.exports.replaceLinebreaks = function replaceLinebreaks(text) {
    if (!text) return text;

    return text.replace(LINEBREAK_PATTERN, '<br>');
};

module.exports.sanitize = function sanitize(text) {
    if (!text) return text;

    //TODO: very hacky
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

module.exports.replaceUrls = function replaceURLs(text) {
    if (!text) return text;

    var res = text.match(URL_PATTERN);

    if (!res) return text;

    res.forEach(function (url) {
        var insertUrl;
        if (url.length > 40) {
            insertUrl = url.substr(0, 20) + '[...]' + url.substr(-20);
        } else {
            insertUrl = url;
        }

        text = text.replace(url, '<a href="' + url + '">' + insertUrl + '</a>');
    });

    return text;
};