const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

/*
const data = {
    to: "arestovich@gmail.com",
    subject: "Когда это все кончится???",
    html: "<p><strong>Максимум</strong> 2-3 недели</p>"
}
*/

const sendEmail = async(data) => {
    const mail = {...data, from: "bogdan.lyamzin.d@gmail.com"};
    await sgMail.send(mail);
    return true;
}

module.exports = sendEmail;
