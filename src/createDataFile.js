'use strict';

var fs = require('fs');

var getargs = require('./getargs');

var parseTripSummaries = require('./parseTripSummaries');

var args = getargs({
  '--summaries': 1,
  '--notesDir': 1,
});

var tripSummaries = parseTripSummaries(fs.readFileSync(args['--summaries'], {encoding: 'utf8'}))
  .map(function(trip) {
    return {
      name: trip.name,
      date: trip.date,
      surveyors: trip.surveyors,
    };
  });

var notesRx = /frcs_(\d+).*.pdf/i;

var notesFiles = fs.readdirSync(args['--notesDir']);
notesFiles.forEach(function(filename) {
  var result = notesRx.exec(filename);
  if (result) {
    tripSummaries[Number(result[1])].notesfile = filename;
  }
});

console.log("'use strict';window.tripSummaries=" + JSON.stringify(tripSummaries) + ';');
