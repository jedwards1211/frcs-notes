module.exports.insert = function(trie, word, dataFn) {
  var node = trie;
  for (var i = 0; i < word.length; i++) {
    var letter = word.charAt(i);
    var child = node[letter];
    if (!child) child = node[letter] = {};
    node = child;
  }
  node.word = word;
  if (dataFn) node.data = dataFn(node.data);
};

function searchRecursive(node, letter, word, previousRow, results, maxCost) {
  var lastColumn = word.length;
  var currentRow = [previousRow[0] + 1];

  for (var column = 1; column <= lastColumn; column++) {
    var insertCost = currentRow[column - 1] + 1;
    var deleteCost = previousRow[column] + 1;
    var replaceCost = word.charAt(column - 1) === letter ?
      previousRow[column - 1] :
      previousRow[column - 1] + 1;

    currentRow[column] = Math.min(insertCost, deleteCost, replaceCost);
  }    

  if (currentRow[lastColumn] <= maxCost && node.word) {
    results[node.word] = {node: node, cost: currentRow[lastColumn]};
  }

  if (Math.min.apply(undefined, currentRow) <= maxCost) {
    for (var letter in node) {
      if (node.hasOwnProperty(letter) && letter.length === 1) {
        searchRecursive(node[letter], letter, word, currentRow, results, maxCost);
      }
    }
  }
}

module.exports.search = function(trie, word, maxCost) {
  var currentRow = [];
  for (var i = 0; i <= word.length; i++) {
    currentRow[i] = i;
  }

  var results = {};

  for (var letter in trie) {
    if (trie.hasOwnProperty(letter) && letter.length === 1) {
      searchRecursive(trie[letter], letter, word, currentRow, results, maxCost);
    }
  }

  return results;
};