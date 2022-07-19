const email = 'notify@jobsai.com';
const currentDate = new Date().toDateString();
const moment = require('moment');

const emailTemplates = {
    user: {
        forgetPassword: function(emailDetails) {
            return {
                from: `HNUGUPAWSA - Automail 👥 <${email}>`, // sender address
                to: `${email},` + emailDetails.email, // comma separated list of receivers
                subject: 'HNUGUPAWSA - Forget-Password! ✔', // Subject line
                text: `Hello ${emailDetails.name}`, // plaintext body
                html: `Hello <strong>${emailDetails.name}</strong>,</br><p>We noticed that you might be having some trouble logging into your HNUGUPAWSA application and requested a password change for accounts associated with this email.<p>Please click link below to reset your password!</p><p><div><li><p><strong>${emailDetails.email}</strong><b> &nbsp;&nbsp;<a href="${emailDetails.URL}">Click here to reset password </a></b></li></p></div></p><p>If you haven't requested to reset your password, please ignore this mail. If you have any queries about this mail, feel free to talk to our team.</p><p>Regards,</p><div>HNUGUPAWSA Support Team</div>`
            };
        },
        changePassword: function(emailDetails) {
            return {
                from: `HNUGUPAWSA - Automail <${email}>`, // sender address
                to: `${email},` + emailDetails.email, // comma separated list of receivers
                subject: 'HNUGUPAWSA - Login credentials reset! ✔', // Subject line
                text: `Hello ${emailDetails.name}`, // plaintext body
                html: `Hello, <b> ${emailDetails.name} </b>,</br><p>Your  login credentials for HNUGUPAWSA application has been changed successfully!. Please use following new credentials to login.</br><div><li> Email : <strong>'${emailDetails.email}'</strong></li></div></br><div><li>Password: <b>'${emailDetails.password}</b></li></div></br><p>If you have already logged in – awesome. If not, feel free to talk to our team. Our customer support team is here for you. We promise to help out however we can.</p> </br> <div></br><p>You can hang onto this email, in case you have trouble accessing your account in the future.</p><p>Regards,</p><div>Jobs AI Support Team</div>`
            }
        }

    }
}

module.exports = emailTemplates;