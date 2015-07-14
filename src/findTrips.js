'use strict';

import Trie from './Trie';

export default function findTrips(query) {
  var words = query.split(/\s+/);

  if (!words.length) return window.tripSummaries;

  var counts = [];
  var maxCount = 0;

  var results = words.map(word => {
    var matches = Trie.search(window.tripNameTrie, word, Math.max(1, word.length / 3));
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
      result.push(window.tripSummaries[tripNum]);
    }
  }

  return result;
}