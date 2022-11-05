const nodemailer = require("nodemailer");
require("dotenv").config();

const {META_PASSWORD} = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465, // 25, 465, 2525
    secure: true,
    auth: {
        user: "bogdan.lyamzin.d@meta.ua",
        pass: META_PASSWORD
    }
}

const transport = nodemailer.createTransport(nodemailerConfig)

/*
const data = {
    to: "arestovich@gmail.com",
    subject: "Когда это все кончится???",
    html: "<p><strong>Максимум</strong> 2-3 недели</p>"
}
*/

const sendEmail = async(data) => {
    const mail = {...data, from: "bogdan.lyamzin.d@meta.ua"};
    await transport.sendMail(mail);
    return true;
}

module.exports = sendEmail;

