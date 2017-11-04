// POST--CREATE
// GET--READ
// PUT--UPDATE
// DELETE--DELETE

//ROUTING PSEUDO-CODE
var db = require("../models");
// var clickyLogic = require("./assets/js/clickyLogic")

module.exports = function(app){
    
    //Read
        //Route to read a specific story id           
    // app.get("/api/story/:id", function(req, res){
    //     db.Story.findOne({
    //         include:[{ model: db.Line, 
    //             where: { 
    //                 lineSelected: true
    //                 // TODO add order by line number
    //             }
    //         }],
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(function(story){
    //         // console.log(story)       
    //         var storiesObject = {
    //             callThisVariableInHandlebarsForEach: story
    //           };
    //         res.render("readStory", storiesObject);
    //         console.log("**These are lines**********************")  
    //         //   console.log(storiesObject.callThisVariableInHandlebarsForEach.dataValues)
    //         console.log(storiesObject.callThisVariableInHandlebarsForEach.dataValues.Lines[0].dataValues.lineText)
            
    //         //This is called in handlebars like this: 
    //         //{{callThisVariableInHandlebarsForEach.dataValues.title}}
    //     });
    // })
    
    //Create Story Route
    app.post("/api/newStory", function(req, res){
        console.log("New Story Specs: ******************")
        var newCreatedStory = req.body;
        console.log(newCreatedStory);
        db.Story.create({
            title:req.body.title,
            genre:req.body.genre,
            openWritingToAllUsers: req.body.openWriting,
            openVotingToAllUsers: req.body.openVoting,
            publiclyVisible:req.body.visible
        })
    })


//I want to get info from the database and post it to a different handlebars page
    app.get("/api/viewAllCreated", function(req, res){
        db.Story.findAll({

        }).then(function(story){
            var allMyStoriesCreatedObject = {
                handlebarsCall:story
            };
            // console.log("****Get all stories****")
            // console.log(story)           
            // console.log(allMyStoriesCreatedObject.handlebarsCall[0].dataValues)
            // console.log(allMyStoriesCreatedObject.handlebarsCall)
            res.render("viewMyStories", allMyStoriesCreatedObject)
        })
    })

}
 

    //Update a story
        //UPDATE WILL NEED BOTH A GET AND A PUT ROUTE
       //app.get("")
        //This will get the specific story with an id passed in its parameters

        //app.put("")
            //This is handle the specifics of updating the actual story
 //***** */
    //DELETE a story?? Maybe??
    //Possibly hide story or update it to where it is no longer visible???
    //Global hide variable