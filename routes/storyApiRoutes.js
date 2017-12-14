const db = require("../models");
const storyService = require("../services/serverLogic");
const timerService = require('../services/timerService');
const userServices = require('../services/userServices');

module.exports = function(app){
    
    //Read
    // Route to read a specific story id           
    app.get("/api/story/:id/read", function(req, res){
        db.Story.findOne({
            include:[{ model: db.Line, required:false,
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
                readStoryObject: story
              };
            res.render("readStory", storiesObject);             
        });
    });
            
    // TODO fix this so you MUST be logged in.  
    //Create Story Route
    app.post("/api/newStory", function(req, res){
        let newStoryObject = {};
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
            votingTimePeriodInMins: req.body.votingTimePeriodInMins,
            storyProgressionStatus: 'Initial Setup Complete'
        })
        .then(function(storyObject){
            // newStoryObject.handlebarCall = storyObject; // TODO remove me if code works
            if (storyObject.scheduleActive){
                // If we have an active schedule, call to add a timer
                timerService.addTimer(storyObject.id);
            }

            db.Permission.create({
                // Give the creator of the story all rights to said story - they can work from there
                permissionAdmin: true,
                permissionWrite: true,
                permissionVote: true,
                StoryId: storyObject.dataValues.id,
                UserId: req.user.id
            })
            .then(function(story){
                let storySeed = req.body.seedStory
                if (storySeed != "") {
                    db.Line.create({
                        lineText: storySeed,
                        lineOrder: 0, // this will be the first line
                        lineSelected: 1, // this line was 'selected' by the admin
                        lineVotedOn: true, // mark this as already done for voting
                        lineVoteCount: 0,
                        StoryId: storyObject.dataValues.id, // the story just created
                        UserId: userId // the user writing the line
                    })
                    .then(function(line){
                        res.json(story);
                    });
                }
                else {
                    res.json(story);   
                }
            });
        });
    });

    //I want to get info from the database and post it to a different handlebars page
    app.get("/api/", function(req, res){
        db.Story.findAll({
        }).then(function(story){
            var allMyStoriesCreatedObject = {
                handlebarsCall:story
            };            
            res.render("viewMyStories", allMyStoriesCreatedObject)
        });
    });

    //Update a story
    //Do not api if client is expecting an html change
    app.put("/api/story/:id/update", function(req, res){       
        var updatedStorySpecs = req.body;
        var id = req.params.id;
        db.Story.update(updatedStorySpecs,{            
                where: {
                    id: req.params.id
                }                
        }).then(function(story){
            if (req.body.scheduleActive == 'true'){
                // If we have an active schedule, call to add a timer
                timerService.addTimer(req.params.id);
            }
            else {
                // Otherwise we get rid of all the timers
                timerService.removeTimer(req.params.id);
            }
            var allMyStoriesCreatedObject = {
                handlebarsCall: story
            }
            res.render("viewMyStories", allMyStoriesCreatedObject)
        });
    });

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
            // console.log(storyToBeVotedOn) 
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
    });

    app.put("/api/story/:id/updateStoryStatus", function(req, res){        
        storyService(req.params.id);
    });

}//End of module.exports