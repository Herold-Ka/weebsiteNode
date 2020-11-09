const Sequelize = require("sequelize"), 
dotenv = require('dotenv');
dotenv.config();

const db = {};

const dbinfo = new Sequelize( process.env.NOM_BSD, process.env.IDENTIFIANT_BSD, process.env.MDP_BSD,{
    host: process.env.HOST,
    dialect: "mysql",
    port: process.env.PORT_BSD,
    pool:{
        max: 5,
        min: 0,
    }
})


dbinfo.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

db.user = require("../models/User")(dbinfo, Sequelize);
db.image = require("../models/Image")(dbinfo, Sequelize);
db.commentaire = require("../models/Commentaire")(dbinfo, Sequelize);
db.article = require("../models/Article")(dbinfo, Sequelize);
db.post = require("../models/Post")(dbinfo, Sequelize);

//article
db.image.belongsTo(db.article, {foreignKey: "articleId"});
db.article.hasOne(db.image, {foreignKey: "articleId"});

//User
db.image.belongsTo(db.user, {foreignKey: "userId"});
db.user.hasOne(db.image, {foreignKey: "userId"});


//Post
db.image.belongsTo(db.post, {foreignKey: "postId"});
db.post.hasOne(db.image, {foreignKey: "postId"});


db.dbinfo = dbinfo;
db.Sequelize = Sequelize;

//dbinfo.sync({force: true});

module.exports = db;