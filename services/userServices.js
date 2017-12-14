let db = require("../models");

//Custom function snippet for passport that restricts a user from certain pages, unless they have logged in!
function authenticationMiddleware () {  
    return (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect('/login')
    }
}

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

module.exports = {
    createOrUpdateUser: createOrUpdateUser,
    authenticationMiddleware: authenticationMiddleware
}