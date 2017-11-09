// stretch goal:  setup a schedule - suggest:  https://www.npmjs.com/package/timers -- NOT YET

var db = require("../models");

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
        let writingTrueOrVotingFalse = thisStory.dataValues.toggleWritingTrueOrVotingFalse;
        console.log(`We're currently at writing true voting false of: ${writingTrueOrVotingFalse}`);
        if (writingTrueOrVotingFalse){
            console.log(`We are currently writing, let's see if we are ready to switch to voting.`);
            if (checkMinWriters(thisStory.dataValues)){
                console.log(`Switching from writing to voting`);
                // It's time to switch from writing to voting:
                let newLineGroup = thisStory.dataValues.currentLineGroup
                newLineGroup++;
                thisStory.update({toggleWritingTrueOrVotingFalse: false});
                thisStory.update({currentLineGroup: newLineGroup});
                thisStory.update({storyProgressionError: 'No Error: Just switched from writing to voting.'});
            }
            else {
                console.log(`We're not quite ready to switch from writing to voting`)
                thisStory.update({storyProgressionError: 'Error: We need more lines written (more writers, or less required writers) to satisfy the requirements.'});
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
                    thisStory.update({storyProgressionError: 'No Error: Just switched from voting to writing.'});
                }
                else {
                    console.log(`We're tied!  So we need to do some magic`);
                    markNonTiedLineAsVotedOn(thisStory.dataValues);
                    thisStory.update({storyProgressionError: 'Error: Voting is tied - votes that are not tied for highest have been dropped, please vote for the remaining options again.'});
                }
            }
            else {
                console.log(`We're not quite ready to switch from voting to writing`);
                thisStory.update({storyProgressionError: 'Error: Voting requires a minimum number of "yes" votes to succeed, we need additional votes to meet the requirement.'});
            }
        }
        else {
            console.log(`ERROR in writingTrueOrVotingFalse - somehow we were neither true nor false`);
        }
    });
}

function checkMinVotes(storyObject){
    let returnValue = false;
    targetMinVotes = storyObject.minimumNumberOfVoters;
    console.log(`Current target for min votes: ${targetMinVotes}`);
    storyObject.Lines.forEach(function(line){
        // let's see if *any* of the lines has sufficient votes to pass
        if (line.dataValues.lineVoteCount >= targetMinVotes) {
            console.log(`We have a winner!  ID: ${line.dataValues.id} has votes of: ${line.dataValues.lineVoteCount} - target is: ${targetMinVotes}`);
            returnValue = true;
        }
    });
    return returnValue;
}

function markAllLinesAsVotedOn(storyObject){
    // Since we've selected a line that is our winner - we need to mark the rest as 'done'
    storyObject.Lines.forEach(function(line){
        line.update({lineVotedOn: true});
    });
}

function markLineAsWinner(storyObject){
    // This marks our single line as a winner - we've alread verified we're not tied, so only one should remain

    // First get our max number out of the available lines
    let maxVoteCount = Math.max.apply(Math,storyObject.Lines.map(function(line){
        return Math.max(line.dataValues.lineVoteCount);
    }));
    console.log(maxVoteCount);
    
    // Then mark this specific line as the 'lineSelected' - aka the winning line from said group
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
    
    let maxVoteCount = Math.max.apply(Math,storyObject.Lines.map(function(line){
        return Math.max(line.dataValues.lineVoteCount);
    }));
    console.log(maxVoteCount);

    let countOfLinesAtNumber = 0;
    storyObject.Lines.forEach(function(line){
        if (line.dataValues.lineVoteCount === maxVoteCount) {
            countOfLinesAtNumber++;
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
        if (line.dataValues.lineVoteCount === maxVoteCount) {
            console.log(`This one passes, it had a tie for most votes - line ID: ${line.dataValues.id}`);
        }
        else {
            console.log(`This one didn't have enough votes - buh bye!`);
            line.update({lineVotedOn: true});
        }
    });
}

function checkMinWriters(storyObject){
    let returnValue = false;
    targetMinWriters = storyObject.minimumNumberOfWriters;
    if (targetMinWriters <= storyObject.Lines.length){
        console.log(`Annnd we have enough writers!  Target:  ${targetMinWriters} - we have: ${storyObject.Lines.length}`)
        returnValue = true;
    }
    return returnValue;
}

module.exports = toggleWritingAndVoting;