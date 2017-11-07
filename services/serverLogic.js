// goal:  toggle between writing and voting

// goal:  if voting tied, return tied and do not toggle

// goal:  if not met min voters or min writers, return and do not toggle

// stretch goal:  setup a schedule - suggest:  https://www.npmjs.com/package/timers
var db = require("../models");

toggleWritingAndVoting(1);

function toggleWritingAndVoting(storyId){
    db.Story.findOne({
        include:[{ model: db.Line, 
            where: { 
                lineVotedOn: false
            }
        }],
        where: {
            id: storyId
        }
    }).then(function(thisStory){
        console.log('******************* toggleWritingAndVoting Then Clause');
        // console.log(thisStory.dataValues);
        if (checkMinRequirementsMet(thisStory.dataValues)){
            console.log(`We've met the min requiresment to continue`);
        }
    });
}

function checkMinRequirementsMet(storyObject){
    let returnValue = false;
    console.log('################### checkMinRequirementsMet');
    
    // first we see if we have the writers
    if(checkMinWriters(storyObject)){
        // if we have the writers, check the votes
        if(checkMinVotes(storyObject)){
            returnValue = true;
        }
    }
    return returnValue;
}

function checkMinVotes(storyObject){
    let returnValue = false;
    console.log('$$$$$$$$$$$$$$$$$$$ check min votes');
    targetMinVotes = storyObject.minimumNumberOfVoters;
    console.log(`Current target for min votes: ${targetMinVotes}`);
    storyObject.Lines.forEach(function(line){
        // let's see if *any* of the lines has sufficient votes to pass
        console.log(`Checking line ID: ${line.dataValues.id}`)
        if (line.dataValues.lineVoteCount >= targetMinVotes) {
            console.log(`We have a winner!  ID: ${line.dataValues.id} has votes of: ${line.dataValues.lineVoteCount} - target is: ${targetMinVotes}`);
            returnValue = true;
        }
    });
    return returnValue;
}

function checkMinWriters(storyObject){
    let returnValue = false;
    console.log('$$$$$$$$$$$$$$$$$$$ check min writers');
    targetMinWriters = storyObject.minimumNumberOfWriters;
    console.log(`Current target for min writers: ${targetMinWriters}`);
    if (targetMinWriters <= storyObject.Lines.length){
        console.log(`Annnd we have enough writers!  Target:  ${targetMinWriters} - we have: ${storyObject.Lines.length}`)
        returnValue = true;
    }
    return returnValue;
}

function checkForTie(){
    return 1
}

module.exports = toggleWritingAndVoting;