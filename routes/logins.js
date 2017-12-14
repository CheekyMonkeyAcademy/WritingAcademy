var passport = require('passport');
var crypto = require('crypto');
var db = require("../models");


module.exports = function(app) {
    app.get('/',
        (req, res) => {
            res.render('index', { user: req.user });
        }); //opens index route.

    app.get('/login',
        (req, res) => {
            res.render('login');
        });
    //opens login page route
    // console.log(twitter)

    app.get('/login/twitter',
        passport.authenticate('twitter'));

    app.get('/twitter/return',
        passport.authenticate('twitter', { failureRedirect: '/login' }),
        (req, res) => {
            console.log(`$$$$$$$$^^^^^ Twitter has returned`);
            res.redirect('/');
        });

    app.post('/twitter/return', (req, res, next) => {
        console.log(req.body.userid);
        res.redirect('/');
    })

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/login'

        }));
    // console.log(`$$$$$$$$^^^^^ Facebook has returned`);

    app.post('/auth/facebook/callback', (req, res, next) => {

        res.redirect('/');
    })

    app.get('/auth/reddit', function(req, res, next) {
        req.session.state = crypto.randomBytes(32).toString('hex');
        passport.authenticate('reddit', {
            state: req.session.state,
            duration: 'permanent',
        })(req, res, next);
    });

    app.get('/auth/reddit/callback', function(req, res, next) {
        // Check for origin via state token
        if (req.query.state == req.session.state) {
            passport.authenticate('reddit', {
                successRedirect: '/',
                failureRedirect: '/login'
            })(req, res, next);
        } else {
            next(new Error(403));
        }
    });


    // Google OAuth 2
    app.get('/auth/google',
    passport.authenticate('google', { scope: 
        [ 'https://www.googleapis.com/auth/plus.login',
        , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
    ));

    app.get('/auth/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    passport.serializeUser(function(user, done){
        done(null, user.userId);
    });
    
    passport.deserializeUser(function(userId, done) {  
        db.User.findOne({
            where: {
                userId: userId
            }
        })
        .then((user) => {
            // TODO restrict this object down to only what we need, not everything
            // console.log(`zzzzzz deserialized user`);
            // console.log(user);
            // console.log(`zzzzzz end deserialize user`);
            done(null, user)
        })
        .catch(err => {
            done(err, null);
        });
    });
}