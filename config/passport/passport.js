//package that encrypts passwords
let bCrypt = require('bcrypt-nodejs');

module.exports = (passport, user) => {
    //initializing local strategy
    let User = user;
    let LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        })
    })

    //USes passport to set request fields
    passport.use('local-signup', new LocalStrategy(

        {
            usernameField: 'email',

            passwordField: 'password',

            passReqToCallback: true // allows us to pass back the entire request to the callback

        }, (req, email, password, done) => {
            //hashed password generating function
            let generateHash = (password) => {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

            };
            //sequelize to find if user email exists
            User.findOne({
                where: {
                    email: email
                }
            }).then((user) => {
                if (user) {
                    //if used rejects and displays message
                    return done(null, false, {
                        message: 'That email is already taken'
                    });

                } else {

                    let userPassword = generateHash(password);

                    let data = {
                        email: email,

                        password: userPassword,

                        firstname: req.body.firstname,

                        lastname: req.body.lastname

                    };
                    //creates new user if none exists
                    User.create(data).then((newUser, created) => {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }

                    });

                }

            });

        }

    ));


    //Signing in already existing user
    passport.use('local-signin', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',

            passwordField: 'password',

            passReqToCallback: true // allows us to pass back the entire request to the callback
        }, (req, email, password, done) => {

            var User = user;

            var isValidPassword = (userpass, password) => {
                return bCrypt.compareSync(password, userpass);

            }

            User.findOne({
                where: {
                    email: email
                }
            }).then((user) => {

                if (!user) {

                    return done(null, false, {
                        message: 'That email does not exist'
                    });

                }

                if (!isValidPassword(user.password, password)) {

                    return done(null, false, {
                        message: 'Incorrect password.'
                    });

                }

                var userinfo = user.get();
                return done(null, userinfo);


            }).catch((err) => {

                console.log("Error:", err);

                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
            });
        }

    ));
}