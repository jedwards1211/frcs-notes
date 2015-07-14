'use strict';

import Trie from './Trie';

import createTripNameTrie from './createTripNameTrie';
import createSurveyorTrie from './createSurveyorTrie';

export default class TripStore {
  constructor(tripSummaries) {
    this.tripSummaries = tripSummaries;
    this.tripNameTrie = createTripNameTrie(tripSummaries);
    this.surveyorTrie = createSurveyorTrie(tripSummaries);
  } 
  find(query) {
    if (!query) return this.tripSummaries; 

    var words = query.split(/\s+/);

    if (!words.length) return this.tripSummaries;

    var counts = [];
    var maxCount = 0;

    var results = words.map(word => {
      var matches = Trie.search(this.tripNameTrie, word, Math.max(1, word.length / 3));
      for (var word in matches) {
        if (matches.hasOwnProperty(word)) {
          var match = matches[word];
          if (match.node.data) {
            match.node.data.forEach(elem => {
              counts[elem.tripNum] = (counts[elem.tripNum] || 0) + 1;
              maxCount = Math.max(maxCount, counts[elem.tripNum]);
            });
          }
        }
      }
    });

    var cutoff = Math.min(maxCount, words.length);

    var result = [];
    for (var tripNum in counts) {
      if (counts[tripNum] >= cutoff) {
        result.push(this.tripSummaries[tripNum]);
      }
    }

    return result;
  }
};