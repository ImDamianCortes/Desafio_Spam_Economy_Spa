const nodemailer = require('nodemailer')
// Paso 1
function enviar(to, subject, html) {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'chileinfoclub@gmail.com',
                pass: '2022@infoclub',
            },
        })
        let mailOptions = {
            from: 'chileinfoclub@gmail.com',
            to,
            subject,
            html,
        }
        transporter.sendMail(mailOptions, (err, data) => {
            if (data) {
                resolve(data)
            }else {
                reject(err)
            }
        })
    })
    
}
// Paso 2
module.exports = enviar