let db = require("../models");
let storyToggle = require('./serverLogic');
let moment = require('moment');
moment().format();

timerService();

function timerService(){
    db.Story.findAll({
        where: {
            scheduleActive: true
        }
    })
    .then(function(story){
        console.log('@@@@@@@@@@@@@@@@@@@@@@ STORY @@@@@@@@@@@@@@@@@@@@@')
        // console.log(story);
        story.forEach(function(thisStory){
            db.Timer.findAll({
                where: {
                    StoryId: thisStory.id
                }
            })
            .then(function(allTimers){
                console.log('###################### TIMER #####################')
                allTimers.forEach(function(timer){
                    if(checkTimer(timer.dataValues)){
                        console.log(`We hit the timer for this story id: ${timer.dataValues.StoryId} - so we're firing it off`);
                        storyToggle(timer.dataValues.StoryId);
                        removeTimer(timer.dataValues.StoryId);
                        addTimer(timer.dataValues.StoryId);
                    }
                    else {
                        console.log(`We aren't at this timer yet ID: ${timer.dataValues.StoryId} time: ${timer.dataValues.timerNextFire}`);
                    }
                });
            });
        });
    });
}

function checkTimer(thisTimer){
    console.log(thisTimer);
    returnValue = false;
    let now = Date.now();
    if (thisTimer.timerNextFire <= now) {
        console.log(`So, this timer needs to fire off, fire away!`);
        returnValue = true;
    }
    else {
        console.log(`We're not ready yet - no  new timer for you!`);
    }
    return returnValue;
}

function addTimer(thisStoryId){
    db.Story.findOne({
        where: {
            id: thisStoryId
        }
    })
    .then(function(story){
        if (story.toggleWritingTrueOrVotingFalse) {
            console.log(`We're in writing - writing timer is: ${story.writingTimePeriodInMins} mins`);
            let newTargetDate = moment().add(story.writingTimePeriodInMins, 'm').toDate();
            console.log(`Now: ${moment()} - and adding ${story.writingTimePeriodInMins} - we get ${newTargetDate}`);
            db.Timer.create({
                StoryId: thisStoryId,
                timerNextFire: newTargetDate
            });
        }
        else {
            console.log(`We're in writing - writing timer is: ${story.votingTimePeriodInMins} mins`);
            let newTargetDate = moment().add(story.votingTimePeriodInMins, 'm').toDate();
            console.log(`Now: ${moment()} - and adding ${story.votingTimePeriodInMins} - we get ${newTargetDate}`);
            db.Timer.create({
                StoryId: story.StoryId,
                timerNextFire: newTargetDate
            });
        }
    });
}

function removeTimer(thisStoryId){
    db.Timer.destroy({
        where: {
            StoryId: thisStoryId
        }
    });
}

module.exports = {
        timerService: timerService,
        addTimer: addTimer
    }