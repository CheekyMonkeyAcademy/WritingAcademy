let db = require("../models");

createOrUpdateUser('stringbean', 009, 'Paul McCartney')

function createOrUpdateUser(provider, userId, displayName) {

    db.User.findOne({
            where: {
                userId: userId
            }
        }).then((userResult) => {
            if (userResult === null) {
                db.User.create({

                    provider: provider,
                    userId: userId,
                    displayName: displayName
                })
            } else {
                let userObj = {
                    provider: provider,
                    userId: userId,
                    displayName: displayName
                }

                db.User.update(
                    userObj, {
                        where: {
                            userId: userId
                        }

                    })
            }
        })
        // return createOrUpdateUser;
}

module.exports = createOrUpdateUser;