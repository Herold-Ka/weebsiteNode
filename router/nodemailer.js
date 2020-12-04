const express = require("express");

const router = express.Router(),
    dotenv = require('dotenv');
dotenv.config();

router.post("/sendmail", (req, res) => {
    const nodemailer = require("nodemailer");
    var transporter = nodemailer.createTransport({
        host: 'mail.domain.fr',
        port: '587',
        auth: {
            user: process.env.WEEB_EMAIL,
            pass: process.env.PASS_EMAIL,
        },
        //secureConnection: 'false',
        tls: {
            //ciphers: 'SSLv3',
            rejectUnauthorized: false
        }

    });
    var mailOptions = {
        from: process.env.WEEB_EMAIL,
        to: req.body.email,
        subject: req.body.obj,
        text: req.body.text
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.json(error);
            console.log(error);
        } else {
            console.log("email sent" + info.response);
            res.json("email sent" + info.response);
        }
    })

});

module.exports = router;