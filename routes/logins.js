var passport = require('passport');
var crypto = require('crypto');


module.exports = function(app) {
    app.get('/',
        (req, res) => {
            res.render('index', { user: req.user });
        });

    app.get('/login',
        (req, res) => {
            res.render('login');
        });

    app.get('/login/twitter',
        passport.authenticate('twitter'));

    app.get('/twitter/return',
        passport.authenticate('twitter', { failureRedirect: '/login' }),
        (req, res) => {
            res.redirect('/');
        });

    app.post('/twitter/return', (req, res, next) => {
        console.log(req.body.user);
        res.redirect('/test');
    })

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));

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


    app.get('/auth/google',
        passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
        });


}