'use strict';

/**
 * getargs.js
 *
 * gets process arguments in an easy-to-use format.
 */

/**
 * @param{expected} a map from argument (including dashes) to number of values or null
 * @returns a map from argument (including dashes) to value (null if no value, array if more than one)
 */
module.exports = function(expected) {
  var result = {};

  for (var i = 2; i < process.argv.length; i++) {
    if (expected.hasOwnProperty(process.argv[i])) {
      var expectedCount = expected[process.argv[i]] || 0;
      if (expectedCount === 0) 
      {
        result[process.argv[i]] = null;
      } 
      else if (expectedCount === 1)
      {
        result[process.argv[i]] = process.argv[i + 1];
      } 
      else
      {
        var array = [];
        result[process.argv[i]] = array; 
        while (expectedCount > 0) {
          array.push(process.argv[++i]);
        }
      }
    }
  }

  return result;
}