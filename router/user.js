const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../database/db");
const { request } = require("express");
const { json } = require("sequelize");
const mailValid = require("./nodemailer");

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
            .then(itemuser => {
                res.status(200).json({
                    message: "Vous devez valider votre mail",
                    email : itemuser.email,
                    password: req.body.password
                });
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

router.get("/login",(req,res) =>{
    db.user.findOne({where: {email: req.body.email}})
    .then(user =>{
        console.log(user)
        if(user.Status === true){
            if(bcrypt.compareSync(req.body.password, user.password)){
                user.StatusCo = 1;
                let userdata = {
                    email: user.email
                };
                let token =jwt.sign(userdata,process.env.SECRET_KEY,{
                    expiresIn: 1440,
                })
                res.status(200).json({token: token})
                res.json( { message: "co"})
            }
            else {
                res.json( { message: "error mail or error password"})
                console.log("nop");

            }
        }
        else{
                res.json({ message: "Vous devez valider votre mail"})
                console.log("mail");
            }
    })
    .catch(err => {
        res.json(err);
    })
})

router.post("/valideMail", (req, res) => {
    db.user.findOne({
        where: {email: req.body.email}
    }).then(user => {
        if(user){
            if(user.Status !== 1){
        user.update({
            Status: 1
        })
        .then(() => {
            res.json({
                message: "votre email est validé"
            })
        })
        .catch(err => {
            res.json(err);
        })
    }else{
        res.json("votre mail est déjà validé");
    }
    }
    else{
        res.status(404).json("user not found !!!");
    }
    })
    .catch(err => {
        res.json(err)
    })  
});

router.delete("/delete/:id", (req, res) => {
    db.user.findOne({
        where: { id: req.params.id }
    })
    .then(user => {
        if(user) {
            user.destroy()
            .then(() => {
                res.json("user deleted")
            }) 
            .catch(err => {
                res.json("error" + err)
            })
        } else {
            res.json({
                err: "can't delete the user"
            })
        }
    })
    .catch(err => {
        res.json("error" + err)
    })
});

router.put("/update/:id", (req, res) => {
    db.user.findOne({
        where: { id: req.params.id }
    })
    .then(user => {
        if(user) {
            user.update({
                nom: req.body.nom,
                prenom: req.body.prenom,
                pseudo: req.body.pseudo,
                email: req.body.email,
                image: req.body.image
                })
                .then(()=> {
                    res.json({message: "modifier"})
                })
                .catch(err => {
                    res.json(err);
                })
        } else {
            res.json("user inconnu")
        }
    })
    .catch(err => {
        res.json(err);
    })
});

module.exports = router;