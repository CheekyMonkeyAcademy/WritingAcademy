module.exports = function(sequelize, DataTypes) {
    let Permission = sequelize.define("Permission", {
        permissionAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        },
        permissionWrite: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        },
        permissionVote: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
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