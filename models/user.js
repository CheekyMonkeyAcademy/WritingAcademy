//user.js

module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {

        tempUserName: { // once we get the real code, NUKE THIS
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    // User.associate = function(models) {
    //     // Associating User with Posts
    //     // When an User is deleted, also delete any associated Posts
    //     User.hasMany(models.Line, {
    //         onDelete: "cascade"
    //     });
    // };

    return User;
};