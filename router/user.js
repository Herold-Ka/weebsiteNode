const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../database/db");
const { request } = require("express");
const { json } = require("sequelize");

process.env.SECRET_KEY = "secret";

router.post("/register", (req,res) => {
    db.user.findOne({
        where: {email: req.body.email}
    })
    .then(user => {
        if(!user){
            const hash = bcrypt.hashSync(req.body.password,10);
            req.body.password = hash;
            db.user.create(req.body)
            .then(item => {

                var nodemailer = require("nodemailer");

            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "karlmerzi@gmail.com",
                    pass:"SSiLvEr97310"
                },
            });

            var mailOptions = {
                from: "karlmerzi@gmail.com",
                to: item.email,
                subject: "Sending Email using Node.js",
                html: "<a href=http://localhost:8080/user/pwd/" +item.forget +">Metter a jour le mot de passe</a>"
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if(error){
                    res.json(error);
                    console.log(error);
                }
                else{
                    console.log("email sent" + info.response);
                   res.json("email sent" + info.response);
                }
            });
                res.status(200).json({
                    message: "Vous devez valider votre mail",
                    email : item.email
                })
            })
            .catch(err => {
                res.json(err);
            })
        }
        else {
            res.json("cette adresse mail et déja utilisée")
        }
    })
    .catch(err => {
        res.json(err)
    })
});
module.exports = router;