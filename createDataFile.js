'use strict';

var fs = require('fs');

var getargs = require('./getargs');

var parseTripSummaries = require('./parseTripSummaries');

var args = getargs({
  '--summaries': 1,
  '--outfile': 1,
});

var tripSummaries = parseTripSummaries(fs.readFileSync(args['--summaries'], {encoding: 'utf8'}));

var data = "'use strict';window.tripSummaries=" + JSON.stringify(tripSummaries) + ';';

fs.writeFileSync(args['--outfile'], data, {encoding: 'utf8'});
