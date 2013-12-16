var nodemailer = require('nodemailer');

var configuration = require('../configuration');

var transport = nodemailer.createTransport('SMTP', {
    host: configuration.mail.host,
    secureConnection: true,
    port: configuration.mail.port,
    auth: {
        user: configuration.mail.userName,
        pass: configuration.mail.password
    }
});

module.exports = transport;