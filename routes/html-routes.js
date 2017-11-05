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
        console.log("TEST");
        res.sendFile(path.join(__dirname, "../public/test.html"));
    //    res.sendFile(path.join(__dirname, "../public/test.html"));
    })

    app.get('/createStory', function (req, res) {
        console.log("TEST create story");
        res.render("createStory");
        //    res.sendFile(path.join(__dirname, "../public/test.html"));
        console.log(req);
    })

    app.get('/writeStory', function (req, res) {
        res.render("writeStory");
        //    res.sendFile(path.join(__dirname, "../public/test.html"));
    })

    app.get('/readStory', function (req, res) {
        res.render("readStory");
        //    res.sendFile(path.join(__dirname, "../public/test.html"));
    })

}