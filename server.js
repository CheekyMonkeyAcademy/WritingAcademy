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
        clientID: '[FBID]',
        clientSecret: '[FBSECRET]',
        callbackURL: 'http://localhost:8080/facebook-token'
    },
    function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function() {

            // To keep the example simple, the user's Facebook profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Facebook account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });
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
// require("./routes/author-api-routes.js")(app); // TODO make real routes
require("./routes/logins")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});