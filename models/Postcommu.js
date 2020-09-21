module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "Postcommu", {
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
            commentaire: {
                type: Sequelize.DataTypes.STRING,
                AllowNull: false
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    );
}