// goal:  automagic toggle between writing and voting -- DONE
    // should we hide this ENTIRELY from user view?  -- YEP

// goal:  if voting tied, return tied and do not toggle -- DONE

// goal:  if not met min voters or min writers, return and do not toggle -- DONE

// goal:  handle a tie scenario for voting - WORKING ON IT

// stretch goal:  setup a schedule - suggest:  https://www.npmjs.com/package/timers -- NOT YET
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
        let writingTrueOrVotingFalse = thisStory.dataValues.toggleWritingTrueOrVotingFalse;
        console.log(`We're currently at writing true voting false of: ${writingTrueOrVotingFalse}`);
        if (writingTrueOrVotingFalse){
            console.log(`We are currently writing, let's see if we are ready to switch to voting.`);
            if (checkMinWriters(thisStory.dataValues)){
                console.log(`Switching from writing to voting`);
                // It's time to switch from writing to voting:
                thisStory.update({toggleWritingTrueOrVotingFalse: false});
            }
            else {
                console.log(`We're not quite ready to switch from writing to voting`)
                // TODO kick off some sort of 'add more writers' ?
            }
        }
        else if (!(writingTrueOrVotingFalse)){
            if (checkMinVotes(thisStory.dataValues)){
                console.log(`Ready to switch from voting to writing again - let's insure we're not tied`);
                if (!(checkVotesToSeeIfTied(thisStory.dataValues))){
                    console.log(`We're not tied - so we're good to go`);
                    // Mark all lines as voted on
                    markAllLinesAsVotedOn(thisStory.dataValues);
                    markLineAsWinner(thisStory.dataValues);
                    // It's time to switch from voting to writing
                    thisStory.update({toggleWritingTrueOrVotingFalse: true});
                }
                else {
                    console.log(`We're tied!  So we need to do some magic`);
                    markNonTiedLineAsVotedOn(thisStory.dataValues);
                    // TODO kick off our 'we are tied' logic - this needs to be built.  
                }
            }
            else {
                console.log(`We're not quite ready to switch from voting to writing`);
                // TODO kick off some sort of 'add more voters' ?
            }
        }
        else {
            console.log(`ERROR in writingTrueOrVotingFalse - somehow we were neither true nor false`);
        }
    });
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

function markAllLinesAsVotedOn(storyObject){
    // Since we've selected a line that is our winner
    storyObject.Lines.forEach(function(line){
        console.log(`Checking line ID: ${line.dataValues.id} - currently voted on of: ${line.dataValues.lineVotedOn}`)
        line.update({lineVotedOn: true});
    });
}

function markLineAsWinner(storyObject){
    let maxVoteCount = Math.max.apply(Math,storyObject.Lines.map(function(line){
        return Math.max(line.dataValues.lineVoteCount);
    }));
    console.log(maxVoteCount);
    
    storyObject.Lines.forEach(function(line){
        console.log(`Checking line ID: ${line.dataValues.id} - currently voted on of: ${line.dataValues.lineVotedOn}`)
        if (line.lineVoteCount === maxVoteCount) {
            line.update({lineSelected: true});
        }
    });
}

function checkVotesToSeeIfTied(storyObject){
    let returnValue = true;
    // we need to find out if we have multiple lines with the same number of votes.  
    
    // let's use a map.
    let maxVoteCount = Math.max.apply(Math,storyObject.Lines.map(function(line){
        return Math.max(line.dataValues.lineVoteCount);
    }));
    console.log(maxVoteCount);

    let countOfLinesAtNumber = 0;
    storyObject.Lines.forEach(function(line){
        console.log(`Checking line ID: ${line.dataValues.id} - currently voted on of: ${line.dataValues.lineVotedOn}`)
        if (line.dataValues.lineVoteCount === maxVoteCount) {
            countOfLinesAtNumber++;
            console.log(`Adding one line at the max number - line ID: ${line.dataValues.id}`)
        }
    });

    if (countOfLinesAtNumber === 1) {
        console.log(`Hooray, we're not tied!`)
        returnValue = false;
    }
    else {
        console.log(`Well shoot, our count of lines at that vote was ${countOfLinesAtNumber} - guess that means we have a tie!`);
    }

    return returnValue;
}

function markNonTiedLineAsVotedOn(storyObject){
    let maxVoteCount = Math.max.apply(Math,storyObject.Lines.map(function(line){
        return Math.max(line.dataValues.lineVoteCount);
    }));
    console.log(maxVoteCount);

    storyObject.Lines.forEach(function(line){
        console.log(`Checking line ID: ${line.dataValues.id} - currently voted on of: ${line.dataValues.lineVotedOn}`)
        if (line.dataValues.lineVoteCount === maxVoteCount) {
            console.log(`This one passes, it had a tie for most votes - line ID: ${line.dataValues.id}`)
        }
        else {
            console.log(`This one didn't have enough votes - buh bye!`);
            line.update({lineVotedOn: true});
        }
    });
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

module.exports = toggleWritingAndVoting;