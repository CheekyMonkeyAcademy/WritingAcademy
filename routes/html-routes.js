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
    //This route here shows the create story html page
    app.get('/test', function(req, res){
       res.sendFile(path.join(__dirname, "../public/test.html"));
    })

    //This route goes to the update form
    app.get("/updateStoryForm/:id", function(req, res){
        db.Story.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(story){
            var storiesObject = {
                handlebarCall: story
                };
                res.render("updateMyStories", storiesObject)
                console.log(storiesObject);
            })
        })
    
   
}
