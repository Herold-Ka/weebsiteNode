module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "User", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nom: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: true
            },
            prenom: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: true
            },
            pseudo: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: false
            },
            email: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false
            },
            image: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true
            },
            StatusCo: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: true,
            },
            Status: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: true
            },
            nvcompte: {
                type: Sequelize.DataTypes.INTEGER(10),
                allowNull: true
            },
            forget: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    );
}