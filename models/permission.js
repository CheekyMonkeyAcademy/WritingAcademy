module.exports = function(sequelize, DataTypes) {
    let Permission = sequelize.define("Permission", {
        permissionText: {
            // Basic idea: 
            // There are three levels of permission:
            // 1. Admin - can change story options, write lines, and vote
            // 2. Writer - can write lines and vote
            // 3. Voter - can vote
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