var runTimer = require('./timerService');

var every = require('schedule').every;

every('60s').do(function() {
    console.log(`Running the timer service.`);
    runTimer.timerService();
});