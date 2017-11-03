// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;

passport.use(new Strategy({
        consumerKey: './config/config.twitterKeys.CONSUMER_KEY',
        consumerSecret: './config/config.twitterKeys.CONSUMER_SECRET',
        callbackURL: 'http://127.0.0.1:3000/login/twitter/return'
    },
    function(token, tokenSecret, profile, cb) {

        return cb(null, profile);
    }));


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
require("./routes/storyApiRoutes.js")(app); // TODO make real routes
// require("./routes/author-api-routes.js")(app); // TODO make real routes
require("./routes/logins")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});