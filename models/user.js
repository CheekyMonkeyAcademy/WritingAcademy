//user.js

module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
        // Giving the User model a name of type STRING
        name: DataTypes.STRING
            //may need to expand on the User object and set some variables

    });

    User.associate = function(models) {
        // Associating User with Posts
        // When an User is deleted, also delete any associated Posts
        User.hasMany(models.Post, {
            onDelete: "cascade"
        });
    };

    return User;
};