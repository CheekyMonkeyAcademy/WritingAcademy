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
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config.json')[env];

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
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

const options = {
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database,
    port: 3306
}

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(options);

app.use(session({
    secret: 'lsdjfklssjlfkshnkj',
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
  }));

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
        consumerKey: config.twitterKeys.CONSUMER_KEY,
        consumerSecret: config.twitterKeys.CONSUMER_SECRET,
        callbackURL: config.twitterKeys.callbackURL /*switch with production*/
    },
    function(token, tokenSecret, profile, cb) {

        userServices(profile.provider, profile.id, profile.displayName),
            function(err, user) {
                return cb(err);

                this.redirect('/'); /*this needs to re-direct to the correct page but for now it routes back to home*/
            };
    }));

passport.use(new FacebookStrategy({
        clientID: config.facebookKeys.clientID,
        clientSecret: config.facebookKeys.clientSecret,
        callbackURL: config.facebookKeys.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {

        userServices(profile.provider, profile.id, profile.displayName), (err, user) => {
            done(err, user);
        };
        this.redirect('/');
    }));

passport.use(new RedditStrategy({
        clientID: config.redditKeys.clientID,
        clientSecret: config.redditKeys.clientSecret,
        callbackURL: config.redditKeys.callbackURL
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
        // TODO move this into the user service
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
