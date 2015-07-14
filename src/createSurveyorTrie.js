'use strict';

var Trie = require('./Trie');

module.exports = function(tripSummaries) {
  var result = {};

  for (var tripNum in tripSummaries) {
    if (tripSummaries.hasOwnProperty(tripNum)) {
      var trip = tripSummaries[tripNum];
      if (trip && trip.surveyors) {
        trip.surveyors.forEach(function(fullName, surveyorIndex) {
          fullName.split(/\s+/).forEach(function(name, nameIndex) {
            Trie.insert(result, name, function(data) {
              var result = data || [];
              result.push({tripNum: tripNum, surveyorIndex: surveyorIndex, nameIndex: nameIndex});
              return result;
            });
          });
        });
      }
    }
  }

  return result;
};