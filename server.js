// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var passport = require('passport');
var crypto = require('crypto');
var colors = require('colors');

var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var RedditStrategy = require('passport-reddit').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let userServices = require('./services/userServices');
let config = require('./config/config.json');

// console.log('jfhfhfhfdhjfdksfgskjgjksgfsgfsfsfgsgkfgkgfskgkauuuwuhdkakd'.bgCyan);
//Twitter strat
// console.log(config);
// console.log('jfhfhfhfdhjfdksfgskjgjksgfsgfsfsfgsgkfgkgfskgkauuuwuhdkakd'.bgCyan);
// console.log(config.development);
// console.log('jfhfhfhfdhjfdksfgskjgjksgfsgfsfsfgsgkfgkgfskgkauuuwuhdkakd'.bgCyan);
// console.log(config.development.twitterKeys);
// console.log('jfhfhfhfdhjfdksfgskjgjksgfsgfsfsfgsgkfgkgfskgkauuuwuhdkakd'.bgCyan);
// console.log(config.development.twitterKeys.CONSUMER_KEY);


passport.use(new TwitterStrategy({
        consumerKey: config.production.twitterKeys.CONSUMER_KEY,
        consumerSecret: config.production.twitterKeys.CONSUMER_SECRET,
        callbackURL: config.production.twitterKeys.callbackURL /*switch with production*/
    },
    function(token, tokenSecret, profile, cb) {

        userServices(profile.provider, profile.id, profile.displayName),
            function(err, user) {
                return cb(err);
                console.log(`${profile.displayName}`.cyan);
                console.log(`${profile.provider}`.bgRed);
                console.log(profile);
                this.redirect('/'); /*this needs to re-direct to the correct page but for now it routes back to home*/
            };
    }));

passport.use(new FacebookStrategy({
        clientID: '143546596268969',
        clientSecret: '558778b491ff119cb794d9fcd5965aa0',
        callbackURL: 'http://localhost:8080/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(`${profile.displayName}`.bgYellow);
        console.log(`${profile.provider}`.bgRed);
        console.log(profile);

        userServices(profile.provider, profile.id, profile.displayName), (err, user) => {
            done(user);
        };
        this.redirect('/');
    }));

passport.use(new RedditStrategy({
        clientID: 'A-_bBpq2-Q7RBg',
        clientSecret: 'D52frJChsu2sbr3RUS3TKWBsAFs',
        callbackURL: "http://localhost:8080/auth/reddit/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile.id);
        console.log(profile.name);
        console.log(profile.provider);
        userServices(profile.provider, profile.id, profile.displayName),
            function(err, user) {
                return done(err, user);
            };
        this.redirect('/');
    }));

passport.use(new GoogleStrategy({
        clientID: '975477224458-fvreqnf88mijr6nt29lhjsjahjqf0b9k.apps.googleusercontent.com',
        clientSecret: 'GuhqDBsS8kRJgTa4cdM9nNob',
        callbackURL: "http://localhost:8080/auth/google/callback"
    },
    function(token, tokenSecret, profile, done) {


    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(profile, cb) {
    cb(null, profile);
});

// Create an instance of the express app.
var app = express();
var PORT = process.env.PORT || 8080;


// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our models for syncing
var db = require("./models");

// console.log(config)

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


app.use(passport.initialize());
app.use(passport.session());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/storyApiRoutes.js")(app);
require("./routes/lineApiRoutes.js")(app);
require("./routes/genreApiSearchRoute.js")(app);
require("./routes/logins")(app);
require("./routes/permissionApiRoutes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});