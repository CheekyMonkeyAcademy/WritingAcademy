// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var passport = require('passport');

var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var RedditStrategy = require('passport-reddit').Strategy;

//Twitter strat
passport.use(new TwitterStrategy({
        consumerKey: 'aI0LlGbbkANCJj3RkS08mTC2f',
        consumerSecret: 'ggEYwryfDm7kGW5obxAUm3eufouK3RtuRZ4DMi2hBCYGTuzGEZ',
        callbackURL: 'http://localhost:8080/twitter/return'

    },
    function(token, tokenSecret, profile, cb) {
        // User.findOrCreate({ twitterId: profile.id }, function(err, user) {
        //     return cb(err);
        //     this.redirect()
        this.redirect('/'); /*this needs to re-direct to the correct page but for now it routes back to home*/
        // });
    }
));
// console.log()
passport.use(new FacebookStrategy({
        clientID: '143546596268969',
        clientSecret: '558778b491ff119cb794d9fcd5965aa0',
        callbackURL: 'http://localhost:8080/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        //     if (err) { return done(err); }
        //     User.findOrCreate({ facebookId: profile.id }, (err, user) => {
        //     done(null, user);
        // });
        this.redirect('/');
    }
));




passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
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

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});