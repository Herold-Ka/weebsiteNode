module.exports = (dbinfo, Sequelize)=> {
    return dbinfo.define(
        "Commentaire", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            contenu: {
                type: Sequelize.DataTypes.STRING(300),
                allowNull: true
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    );
}