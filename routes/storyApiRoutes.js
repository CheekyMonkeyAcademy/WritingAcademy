// POST--CREATE
// GET--READ
// PUT--UPDATE
// DELETE--DELETE

//ROUTING PSEUDO-CODE
var db = require("../models");
var storyService = require("../services/serverLogic");

module.exports = function(app){
    
    //Read
        // Route to read a specific story id           
    app.get("/api/story/:id/read", function(req, res){
        db.Story.findOne({
            include:[{ model: db.Line, 
                where: { 
                    lineSelected: true
                    // TODO add order by line number
                }
            }],
            where: {
                id: req.params.id
            }
        }).then(function(story){              
            var storiesObject = {
                callThisVariableInHandlebarsForEach: story
              };
            res.render("readStory", storiesObject);                     
         });
    })
            
    //Create Story Route
    app.post("/api/newStory", function(req, res){
        console.log("New Story Specs: ******************")
        var newCreatedStory = req.body;
        console.log(newCreatedStory.title);
        db.Story.create({
            title:req.body.title,
            genre:req.body.genre,
            openWritingToAllUsers: req.body.openWriting,
            openVotingToAllUsers: req.body.openVoting,
            publiclyVisible: req.body.visible,
            minimumNumberOfVoters: req.body.minimumNumberOfVoters,
            minimumNumberOfWriters: req.body.minimumNumberOfWriters,
            scheduleActive: req.body.scheduleActive,
            writingTimePeriodInMins: req.body.writingTimePeriodInMins,
            votingTimePeriodInMins: req.body.votingTimePeriodInMins

        });
        res.render("createStory");
        //TODO: WITH OLEG- WORK ON HIS MAIN PAGE DIRECTING TO CREATE A NEW STORY ROUTE- THIS ROUTING SHOULD BE HANDLED IN THE HTML ROUTE FILE
    })

//I want to get info from the database and post it to a different handlebars page
    app.get("/api/", function(req, res){
        db.Story.findAll({
        }).then(function(story){
            var allMyStoriesCreatedObject = {
                handlebarsCall:story
            };            
            res.render("viewMyStories", allMyStoriesCreatedObject)
        })
    }) 

    //Update a story
    //Do not api if client is expecting an html change
    app.put("/api/story/:id", function(req, res){       
            console.log("****Updated Story Spec******")
            var updatedStorySpecs = req.body;
            var id = req.params.id;
            //This works I am getting the correct req.body
            console.log(req.body)
            db.Story.update(updatedStorySpecs,{            
                    where: {
                        id: req.params.id
                    }                
            }).then(function(story){
                var allMyStoriesCreatedObject = {
                    handlebarsCall: story
                }
                //TODO: WITH OLEG- WORK ON REDIRECT TO VIEW ALL STORIES PAGE
                res.render("viewMyStories", allMyStoriesCreatedObject)
                //res.redirect('/stories') to the view page
        })       
    })

    //prep interface for voting
    app.get("/api/story/:id/voting", function(req, res){       
        var id = req.params.id;
        // first we get our lines that we need to vote on
        db.Story.findOne({
            include:[{ model: db.Line, 
                where: { 
                    lineVotedOn: false
                }
            }],
            where: {
                id: req.params.id
            }
        }).then(function(storyToBeVotedOn){
            console.log(storyToBeVotedOn) 
            // add first to stories object      
            var storiesObject = {
                storyLinesToBeVotedOn: storyToBeVotedOn
              };
              // then we get our lines that already exist in the story
              db.Story.findOne({
                include:[{ model: db.Line, 
                    where: { 
                        lineSelected: true
                        // TODO add order by line number
                    }
                }],
                where: {
                    id: req.params.id
                }
            }).then(function(storyLinesAlreadyWritten){
                // add second to storiesObject - so we can call both on the front end --- note the names are more descriptive :)
                storiesObject.storyLinesAlreadyWritten = storyLinesAlreadyWritten;
                res.render("voteForNextLine", storiesObject);
            });
        });    
    })

    app.put("/api/story/:id/updateStoryStatus", function(req, res){        
        storyService(req.params.id);
    });

}//End of module.exports