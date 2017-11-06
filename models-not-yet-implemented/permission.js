module.exports = function(sequelize, DataTypes) {
    let Permission = sequelize.define("Permission", {
        permissionNum: {
            // TODO finalize this
            // Basic idea:  
            // There are three levels of permission:
            // 1. Admin - can change story options, write lines, and vote
            // 2. Writer - can write lines and vote
            // 3. Voter - can vote

            // These numbers correspond with the permissions (might as well?)
            // The text is for verification... it's a constant (would like to scrap the text)

            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        permissionText: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
        // createdAt: Sequelize.DATE,
        // updatedAt: Sequelize.DATE,
    });

    Permission.associate = function(models) {

        Permission.belongsTo(models.Story, {
            foreignKey: {
                allowNull: false
            }
        });

        Permission.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Permission;
};