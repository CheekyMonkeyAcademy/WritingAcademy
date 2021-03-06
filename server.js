// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var passport = require('passport');
var crypto = require('crypto');

var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var RedditStrategy = require('passport-reddit').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
let userServices = require('./services/userServices');
let config = require('./config/config.json');

//custom built depdencies
let runServices = require('./services/runServices');


// Create an instance of the express app.
const app = express();
const PORT = process.env.PORT || 8080;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our models for syncing
var db = require("./models");


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

//Twitter strat
passport.use(new TwitterStrategy({
        consumerKey: config.production.twitterKeys.CONSUMER_KEY,
        consumerSecret: config.production.twitterKeys.CONSUMER_SECRET,
        callbackURL: config.production.twitterKeys.callbackURL /*switch with production*/
    },
    function(token, tokenSecret, profile, cb) {

        userServices(profile.provider, profile.id, profile.displayName),
            function(err, user) {
                return cb(err);

                this.redirect('/'); /*this needs to re-direct to the correct page but for now it routes back to home*/
            };
    }));

passport.use(new FacebookStrategy({
        clientID: config.production.facebookKeys.clientID,
        clientSecret: config.production.facebookKeys.clientSecret,
        callbackURL: config.production.facebookKeys.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {


        userServices(profile.provider, profile.id, profile.displayName), (err, user) => {
            done(user);
        };
        this.redirect('/');
    }));

passport.use(new RedditStrategy({
        clientID: config.production.redditKeys.clientID,
        clientSecret: config.production.redditKeys.clientSecret,
        callbackURL: config.production.redditKeys.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {

        userServices(profile.provider, profile.id, profile.displayName),
            function(err, user) {
                return done(err, user);
            };
        this.redirect('/');
    }));

    passport.use(new GoogleStrategy({
        clientID:     `763654066344-7rok26dkplnoagci46oieb58303md5qo.apps.googleusercontent.com`,
        clientSecret: `faDZggDkMGEO0GSggDs3YqMz`,
        callbackURL: `http://localhost:${PORT}/auth/google/callback`,
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        db.User.findOne({
            where: {
                userId: profile.id
            }
        }).then((user) => {
            //No user was found... so create a new user with values from Facebook (all the profile. stuff)
            if (!user) {
                db.User.create({
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    userId: profile.id,
                    username: profile.username,
                    provider: 'google'
                })
                .then((user) => {
                    console.log(`This is the done user`);
                    console.log(user);
                    console.log(`This is the end of the done user`);
                    return done(null, user);
                })
                .catch(err => {
                    if (err) { 
                        console.log('err', err);
                        return done(err);
                    }
                });
            } else {
                //found user. Return
                let updatedUserSpecs = {
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    userId: profile.id,
                    provider: 'google',
                }
                console.log(updatedUserSpecs);
                db.User.update(updatedUserSpecs,{
                    where: {
                        userId: updatedUserSpecs.userId
                    }    
                })
                .then((results) => {
                    return done(null, updatedUserSpecs);
                })
                .catch(err => {
                    if (err) { 
                        console.log('err', err);
                        return done(err);
                    }
                });
            }
        });
    }
));

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
