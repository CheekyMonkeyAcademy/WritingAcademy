//user.js

module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
        name: {
            // Giving the User model a name of type STRING
            twitter: {

                twitterId: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        len: [1]
                    }
                },

                displayName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        len: [1]
                    }
                },

                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        len: [1]
                    }
                },
                token: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        len: [1]
                    }
                }
            }
        }

        //may need to expand on the User object and set some variables

    });

    User.associate = function(models) {
        // Associating User with Posts
        // When an User is deleted, also delete any associated Posts
        User.hasMany(models.Line, {
            onDelete: "cascade"
        });
    };

    return User;
};