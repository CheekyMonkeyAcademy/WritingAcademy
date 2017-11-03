var passport = require('passport');


module.exports = function(app) {
    app.get('/',
        function(req, res) {
            res.render('home', { user: req.user });
        });

    app.get('/login',
        function(req, res) {
            res.render('login');
        });

    app.get('/login/twitter',
        passport.authenticate('twitter'));

    app.get('/login/twitter/return',
        passport.authenticate('twitter', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
        });

    app.get('/profile',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res) {
            res.render('profile', { user: req.user });
        });
}