// POST--CREATE
// GET--READ
// PUT--UPDATE
// DELETE--DELETE

//ROUTING PSEUDO-CODE
var db = require("../models");

module.exports = function(app){
    
    //Read
        // Route to read a specific story id           
    // app.get("/api/story/:id", function(req, res){
    //     // console.log("TEST");
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
    //         // YOU WILL NEED ALL OF THIS LATER TO GET THE INDIVIDUAL LINES--KEEP

    //         res.render("readStory", storiesObject);
    //         console.log(storiesObject.callThisVariableInHandlebarsForEach);

    //         console.log("**These are lines**********************")  

    //         //console.log(storiesObject.callThisVariableInHandlebarsForEach.dataValues)
    //         //console.log(storiesObject.callThisVariableInHandlebarsForEach.dataValues.Lines[0].dataValues.lineText)
            
    //         //This is called in handlebars like this: 
    //         //{{callThisVariableInHandlebarsForEach.dataValues.title}}

    //         console.log(storiesObject.callThisVariableInHandlebarsForEach.dataValues)
    //         console.log(storiesObject.callThisVariableInHandlebarsForEach.dataValues.Lines[0].dataValues.lineText)
    //         // This is called in handlebars like this: 
    //         // {{callThisVariableInHandlebarsForEach.dataValues.title}}
    //     });
    // })
            
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
            publiclyVisible:req.body.visible
        })
        //TODO: WITH OLEG- WORK ON HIS MAIN PAGE DIRECTING TO CREATE A NEW STORY ROUTE- THIS ROUTING SHOULD BE HANDLED IN THE HTML ROUTE FILE
    })

//I want to get info from the database and post it to a different handlebars page
    app.get("/api/", function(req, res){
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
            //TODO: WITH OLEG- HAVE THIS INFORMATON RENDER VIEW ALL PAGE WITH STYLEs
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
                //res.render("viewMyStories", allMyStoriesCreatedObject)
                //res.redirect('/stories') to the view page
        })       
    })

}//End of module.exports