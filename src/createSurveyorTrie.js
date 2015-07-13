'use strict';

var Trie = require('./Trie');

module.exports = function(tripSummaries) {
  var result = new Trie();

  for (var tripNum in tripSummaries) {
    if (tripSummaries.hasOwnProperty(tripNum)) {
      var trip = tripSummaries[tripNum];
      if (trip.surveyors) {
        trip.surveyors.forEach(function(fullName, surveyorIndex) {
          name.split(/\s+/).forEach(function(name, nameIndex) {
            result.insert(name, function(data) {
              var result = data || [];
              result.push({tripNum: tripNum, surveyorIndex: surveyorIndex, nameIndex: nameIndex});
            });
          });
        });
      }
    }
  }

  return result;
};