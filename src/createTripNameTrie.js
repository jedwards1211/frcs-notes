'use strict';

var Trie = require('./Trie');

module.exports = function(tripSummaries) {
  var result = {};

  for (var tripNum in tripSummaries) {
    if (tripSummaries.hasOwnProperty(tripNum)) {
      var trip = tripSummaries[tripNum];
      if (trip && trip.name) {
        trip.name.split(/\s+/).forEach(function(word, index) {
          Trie.insert(result, word.toLowerCase(), function(data) {
            var result = data || [];
            result.push({tripNum: tripNum, index: index});
            return result;
          });
        });
      }
    }
  }

  return result;
};