const Sequelize = require("sequelize");

const db = {};

const dbinfo = new Sequelize("wsbsd", "root", "",{
    host: "localhost",
    dialect: "mysql",
    port: "3308",
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
db.postcommu = require("../models/Postcommu")(dbinfo, Sequelize);


db.dbinfo = dbinfo;
db.Sequelize = Sequelize;

//dbinfo.sync({force: true});

module.exports = db;