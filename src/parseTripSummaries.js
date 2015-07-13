'use strict';

var tripStart = /^ {2}\d | {1}\d{2} |\d{3} |\d{4} /;

/**
 * Parses data from a STAT_sum.txt file.  Here is an excerpt of the format:
<pre>  1   2/15/81    258.60   17   ENTRANCE DROPS, JOE'S "I LOVE MY WIFE TRAVERSE", TRICKY TRAVERSE                EXCLUDED:   0.00  0
                               Peter Quick  Keith Ortiz  
                                 A1           AD1-AD3      AE1          AE1 SIDE     
                                 AE9 SIDE     AE10-AE9     AE13 SIDE    AE15 SIDE    
                                 AE20-AE11    

  3   3/ 6/81   2371.20   61   DOUG'S DEMISE (50 FT DROP), CHRIS CROSS, CRAWL ABOVE DROP                       EXCLUDED:   0.00  0
                               Peter Quick  Chris Gerace  Phil Oden  Chip Hopper  
                                 A13 SIDE     B1-B5        B2 SIDE      B3 SIDE      
                                 B6-B18       B17 SIDE     B19-B38      B32 SIDE     
                                 BS1-BS5      C1-C18       </pre>
 *
 * @param{lines} an array of strings representing lines of the file to parse.
 * @returns a array with the following format (ex. parsed from above).
 * array[3] gets the data for trip 3 (not trip 4 as programmers might expect :).
 * Note that there are null values at indices 0 and 2 because there are no trips 
 * numbered 0 or 2 in the example above.  Also the date fields will be date 
 * objects, below is the JSON.stringify()ed version.
<pre>[
null,
{
  "tripNum": 1,
  "date": "1981-02-15T06:00:00.000Z",
  "footage": 258.6,
  "numShots": 17,
  "name": "ENTRANCE DROPS, JOE'S \"I LOVE MY WIFE TRAVERSE\", TRICKY TRAVERSE",
  "excludedFootage": 0,
  "numExcludedShots": 0,
  "surveyors": [
    "Peter Quick",
    "Keith Ortiz"
  ],
  "shots": [
    "A1",
    "AD1-AD3",
    "AE1",
    "AE1 SIDE",
    "AE9 SIDE",
    "AE10-AE9",
    "AE13 SIDE",
    "AE15 SIDE",
    "AE20-AE11"
  ]
},
null,
{
  "tripNum": 3,
  "date": "1981-03-06T06:00:00.000Z",
  "footage": 2371.2,
  "numShots": 61,
  "name": "DOUG'S DEMISE (50 FT DROP), CHRIS CROSS, CRAWL ABOVE DROP",
  "excludedFootage": 0,
  "numExcludedShots": 0,
  "surveyors": [
    "Peter Quick",
    "Chris Gerace",
    "Phil Oden",
    "Chip Hopper"
  ],
  "shots": [
    "A13 SIDE",
    "B1-B5",
    "B2 SIDE",
    "B3 SIDE",
    "B6-B18",
    "B17 SIDE",
    "B19-B38",
    "B32 SIDE",
    "BS1-BS5",
    "C1-C18"
  ]
}
]</pre>
 */
module.exports = function(lines) {
  if (typeof lines === 'string') lines = lines.split(/\r\n|\n\r|\r|\n/);

  var result = [];

  var i = 0;

  function parseTrip() {
    var tripNum = parseInt(lines[i].substring(0, 4));

    if (tripNum >= 1000) {
      // There are only 3 columns reserved for the trip number, so when we
      // get to trips in the 1000s an extra digit will push the rest of the
      // line over.  So delete a space after the trip number so the rest
      // of the line can be parsed as usual.
      lines[i] = lines[i].substring(0, 4).concat(lines[i].substring(5));
    }

    var year = parseInt(lines[i].substring(11, 14));

    if (year >= 100) {
      year += 1900;
      // I discovered this by accident!
      // Dates after 2000 have 3 digits in the file (e.g. 5/28/114), and the
      // extra digit pushes the rest of the line over one character.  So just
      // delete the extra character so that the rest of the line can be parsed
      // as usual.
      lines[i] = lines[i].substring(0, 11).concat(lines[i].substring(12));
    }

    var trip = {
      tripNum:                tripNum,
      date:                   new Date(year,
                       parseInt(lines[i].substring(5, 7)) - 1,
                       parseInt(lines[i].substring(8, 10))),
      footage:                parseFloat(lines[i].substring(14, 23)),
      numShots:               parseFloat(lines[i].substring(24, 31)),
      name:                   lines[i].substring(31, 111).trim(),
      excludedFootage:        parseFloat(lines[i].substring(120, 127)),
      numExcludedShots:       parseInt(lines[i].substring(127, 130)),
      surveyors:              lines[++i].trim().split(/  /),
      shots:                  []
    };
    
    while (i < lines.length - 1 && !tripStart.test(lines[++i]))   {
      var trimmed = lines[i].trim();
      if (trimmed.length) {
        Array.prototype.push.apply(trip.shots, trimmed.split(/\s\s+|\t+/));
      }
    }

    return trip;
  }
  
  while (i < lines.length) {
    if (tripStart.test(lines[i])) {
      var trip = parseTrip();
      result[trip.tripNum] = trip;
    } else {
      i++;
    }
  }

  return result;
}