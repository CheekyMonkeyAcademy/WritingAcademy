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

}

//**Seperate file with logic to be required in HERE! ()******

//After the voting has been "processed", then some logic will happen here to UPDATE the story with the accepted line
    //app.get("")
        //Get one line to update it

    //app.put()
        //Update story
        //This will need to take in an ID(or multiple id's) as a parameter
        //Add line **GOT** to put it in the story

    //-----

    //app.post("")
        //Create a line here for the story
        //id as a parameter

    //DELETE
    //We are not deleting lines submitted
        //Where do they go??? Who knows?? 