const express = require("express");
const router = express.Router();
const db = require("../database/db");
const { Op } = require("sequelize");

router.post("/newArticle",(req,res)=> {
    var description = req.body.description;
    var image = req.body.image;

    db.article.findOne({
        where:{ titre: req.body.titre}
    })
    .then(article => {
        if(!article){
            db.article.create(req.body)
            .then(itemarticle => {
              db.image.create({
                  image: image,
                  articleId: itemarticle.id
              })
              .then(() => {
                    db.description.create({
                        description: description,
                        articleId: itemarticle.id
                    })
                    .then(() => {
                        db.contenu.create({
                            contenu: contenu,
                            articleId: itemarticle.id
                        })
                        .then(() => {
                            db.article.findOne({
                                where: {id: itemarticle.id},
                                include:[{
                                    model: db.image
                                },
                                {
                                    model: db.description
                                },
                                {
                                    model: db.contenu
                                }
                            ]
                            })
                            .then(article => {
                                res.status(200).json({article: article})
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
            res.json("article déja bas la base");
        }
    })
    .catch(err => {
        res.status(502).json(err);
    })

});

router.get("/findBy/:titre",(req,res) => {
    db.article.findAll({
        where: {
            titre: {
                [Op.like]:"%"+ req.params.titre+"%",
            }
        },
        include:[{
            model: db.image
        },
        {
            model: db.contenu
        },
        {
            model: db.description
        },
    ]
    })
    .then(articles => {
        res.status(200).json({articles: articles})
    })
    .catch(err => {
        res.json(err)
    })
})

router.get("/nbArticlePPageReverse/:limit/:media",(req,res)=>{
    db.article.findAll({
        order: [['id','DESC',],],
        include:[
            {
            model:db.image,
        },
    ],
    limit: parseInt(req.params.limit), 
    where:{ media: req.params.media},
    })

    .then(articles => {
        res.status(200).json({articles: articles})
    })
    .catch(err => {
        res.status(502).json("bad req" + err);
    });
 
});

router.get("/nbArticlePageArticle/:limit",(req,res)=>{
    db.article.findAll({
        order: [['id','DESC',],],
        include:[
            {
            model:db.image,
        },
    ],
    limit: parseInt(req.params.limit), 
    })

    .then(articles => {
        res.status(200).json({articles: articles})
    })
    .catch(err => {
        res.status(502).json("bad req" + err);
    });
 
});

router.get("/nbArticlePPage/:limit/:media",(req,res)=>{
    db.article.findAll({
        include:[
            {
            model:db.image,
        },
    ],
    limit: parseInt(req.params.limit),
    where:{ media: req.params.media}
    })
        .then(articles => {
            res.status(200).json({articles: articles})
            })
        .catch(err => {
            res.status(502).json("bad req" + err);
        });
});

router.get("findById/:id",(req, res)=>{
    db.article.findAll({
        where:{
            id: req.params.id,
        },
        include:[{
            model: db.image
        },
        {
            model: db.description
        },
    ]
    })
    .then((articles)=>{
        res.json({articles: articles})
    })
    .catch((err)=>{
        res.json(err);
    })
})

module.exports = router;