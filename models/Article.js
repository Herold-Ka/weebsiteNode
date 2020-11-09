module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "Arcticle", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            titre: {
                type: Sequelize.DataTypes.STRING(20),
                AllowNull: false
            },
            image: {
                type: Sequelize.DataTypes.TEXT,
                AllowNull: false
            },
            contenu: {
                type: Sequelize.DataTypes.STRING,
                AllowNull: false
            },
            description: {
                type: Sequelize.DataTypes.STRING(35),
                AllowNull: false
            },
            media:{
                type: Sequelize.DataTypes.STRING(60),
                AllowNull: false
            },
        },
        {
            timestamps: true,
            underscored: true
        }
    );
}