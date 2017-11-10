module.exports = function(sequelize, DataTypes) {
    let Timer = sequelize.define("Timer", {
        timerNextFire: {
            type: DataTypes.DATE,
            allowNull: false,
            default: '2017-10-31:12:00:00',
            validate: {
                len: [1]
            }
        }
    });

    Timer.associate = function(models) {
        Timer.belongsTo(models.Story, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Timer;
};