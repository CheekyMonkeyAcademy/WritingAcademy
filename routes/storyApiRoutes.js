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
    app.get("/api/story/:id", function(req, res){
        db.Story.findOne({
            include:[db.Line],
            where: {
                id: req.params.id
            }
        }).then(function(story){
            // console.log(story)       
            var storiesObject = {
                callThisVariableInHandlebarsForEach: story
              };
            res.render("readStory", storiesObject);
            console.log("**These are lines**********************")  
            //   console.log(storiesObject.callThisVariableInHandlebarsForEach.dataValues)
            console.log(storiesObject.callThisVariableInHandlebarsForEach.dataValues.Lines[0].dataValues.lineText)
            
            //This is called in handlebars like this: 
            //{{callThisVariableInHandlebarsForEach.dataValues.title}}
        });
    })
    
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
}

//ROOT Page???

    //Create a story
        //app.post("")
        //Route to create story

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