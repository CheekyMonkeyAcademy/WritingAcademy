let db = require("../models");

createOrUpdateUser('stringbean', 008, 'John Lennon')

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
}

module.exports = createOrUpdateUser;