var Trie = module.exports = function() {
};

Trie.prototype.insert = function(word, dataFn) {
  var node = this;
  for (var i = 0; i < word.length; i++) {
    var letter = word.charAt(i);
    var children = node.children;
    if (!children) children = node.children = {};
    node = children[letter];
    if (!node) node = children[letter] = new Trie();
  }
  node.word = word;
  node.data = dataFn(node.data);
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
    var children = node.children;
    for (var letter in children) {
      if (children.hasOwnProperty(letter)) {
        searchRecursive(children[letter], letter, word, currentRow, results, maxCost);
      }
    }
  }
}

Trie.prototype.search = function(word, maxCost) {
  if (!this.children) return [];

  var currentRow = [];
  for (var i = 0; i <= word.length; i++) {
    currentRow[i] = i;
  }

  var results = {};

  var children = this.children;
  for (var letter in children) {
    if (children.hasOwnProperty(letter)) {
      searchRecursive(children[letter], letter, word, currentRow, results, maxCost);
    }
  }

  return results;
};