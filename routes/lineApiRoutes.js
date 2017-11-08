// POST--CREATE
// GET--READ
// PUT--UPDATE
// DELETE--DELETE

var db = require("../models");

module.exports = function(app){

    app.put("/api/line/:id/voteYes", function(req, res){       
        console.log(req.params.id);
        db.Line.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(thisLine){
            var newVoteCount = thisLine.lineVoteCount;
            newVoteCount++;
            console.log(`${thisLine.lineVoteCount} is now ${newVoteCount}`)
            return thisLine.update({lineVoteCount: newVoteCount});
        }).then(function (recordUpdate) {
            res.sendStatus(200);
        });
    })

    //Route to write a line in the story and submit to the database
    app.get("/api/story/:id/write", function(req, res){
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
                callThisVariableInHandlebarsForEach: story
              };
            res.render("writeLine", storiesObject);    
            console.log(storiesObject)                 
         });
    })


    app.post("/api/story/:id/:currentLineGroup", function (req, res){
       console.log("Line Just Added****************")
       var lineJustAdded = req.body;
       var lineGroup = req.params.currentLineGroup;
       var storyId = req.params.id;
       var writeLineForThisStory = req.params
       console.log(lineJustAdded);
    //    console.log(params)
       db.Line.create({
            lineText: lineJustAdded.lineBody,
            lineOrder:lineGroup,
            lineVotedOn: false,
            lineVoteCount: 0, 
            StoryId:storyId,
            lineSelected:false
       })
    })

    

}//End of module.exports


