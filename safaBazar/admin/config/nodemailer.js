const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
    // service: 'Gmail',
    // auth: {
    // 	user: 'janakrajbhatta@gmail.com',
    // 	pass: 'Nepal@123'
    // }
    host: 'accountancy-group.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'notify@accountancy-group.com',
        pass: 'jobsai17@'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});