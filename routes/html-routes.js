// Dependencies
// =============================================================
var path = require("path");
// var express = require('express');
// var router = express.Router();
var db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {
    // app.get('/', function(req, res) {
    //     db.Story.findAll({}).then(function(stories){
        
    //     var storiesObject = {
    //         callThisVariableInHandlebarsForEach: stories
    //       };    
    //     console.log(storiesObject);
    //         res.render("index", storiesObject);
    //     });
    // });

    //EXAMPLE HTML FILE TEST
    app.get('/', function(req, res){
       res.sendFile(path.join(__dirname, "../public/test.html"));
    })
}