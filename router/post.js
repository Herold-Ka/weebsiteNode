const express = require("express");
const router = express.Router();
const db = require("../database/db");


router.post("/newPost",(req,res)=> {
    var description = req.body.description;
    var image = req.body.image;

    db.post.findOne({
        where:{ titre: req.body.titre}
    })
    .then(post => {
        if(!post){
            db.post.create(req.body)
            .then(itempost => {
              db.image.create({
                  image: image,
                  postId: itempost.id
              })
              .then(() => {
                    db.description.create({
                        description: description,
                        postId: itempost.id
                    })
                    .then(() => {
                        db.commentaire.create({
                            commentaire: commentaire,
                            postId: itempost.id
                        })
                        .then(() => {
                            db.post.findOne({
                                where: {id: itempost.id},
                                include:[{
                                    model: db.image
                                },
                                {
                                    model: db.description
                                },
                                {
                                    model: db.commentaire
                                }
                            ]
                            })
                            .then(post => {
                                res.status(200).json({post: post})
                            })
                            .catch(err => {
                                res.status(502).json(err);
                            })
                            
                        })
                        .catch(err => {
                            res.status(502).json(err);
                        })
                    })
                })
                    .catch(err => {
                        res.status(502).json(err);
                    })
              })
              .catch(err => {
                res.status(502).json(err);
            })
           
            .catch(err => {
                res.status(502).json(err);
            })
        }
        else{
            res.json("post déja base la base");
        }
    })
    .catch(err => {
        res.status(502).json(err);
    })

});

router.delete("/deletePost/:id", (req, res) =>{    
    db.post.findAll({
        where: {id: req.params.id}
    })
    .then((post)=>{
        if(post){
            post.destroy()
            .then(()=>{
                res.json("Le post supprimé");
            })
            .catch((err)=>{
                res.json(err);
            })
        }
        else{
            res.json("le post n'existe pas");
        }
    })
    .catch((err)=>{
        res.json(err);
    })
})

module.exports = router;