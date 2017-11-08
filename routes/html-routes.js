// Dependencies
// =============================================================
var path = require("path");
// var express = require('express');
// var router = express.Router();
var db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {
    app.get('/viewStories', function(req, res) {
        db.Story.findAll({}).then(function(stories){
        
        var storiesObject ={
            handlebarsCall: stories
        }

        console.log(storiesObject);
            res.render("viewMyStories", storiesObject);
        });
    });

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
    
    app.get('/createStory', function(req, res){
        res.render("createStory");
    })   

    app.get('/viewStories', function(req, res){
        res.render("viewMyStories")
    })

    app.get('/writeStory', function(req, res){
        //TODO: WHEN THIS IS CLICKED--NEED TO GET EXACT STORY ID
        res.render("writeLine");
    })

    app.get('/voteLines', function(req, res){
        res.render("voteForNextLine")
    })
}//End of module.exports
