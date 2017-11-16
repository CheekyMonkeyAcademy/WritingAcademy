let runTimer = require('./timerService');

let every = require('schedule').every;

every('65s').do(function() {
    console.log(`Running the timer service.`);
    runTimer.timerService();
});