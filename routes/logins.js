var passport = require('passport');


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


}