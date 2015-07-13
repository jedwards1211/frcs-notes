'use strict';

/**
 * Parses data from a .fr calculated survey file.  These look like so:
<pre>  123.182259
  AE20     1    1       0       0      0   153  -257   -51    85   0  20     1
  AE19     1    2     653     402   -548  1046  -587  -174    97   0 200     1
  AE18     2    3     669     449  -3002   995    94  -597   -56 250   0     1
  AE17     3    4     539    1217  -2770   497    47  -298   -28   0   0     1
  AE16     4    5     544    1230  -3441   411  -284  -246   170  60  10     1
  AE15     5    6    1679    1663  -3833     0     0  -282   283  20  10     1
  AE14     6    7    2026    2617  -3730   446   225  -446  -225   0  30     1
  AE13     7    8     391    3152  -5788  -111   691     0     0 200  50     1
  AE12     8    9   -1019    2175  -4630  -369   336   221  -201  40  40     1
  AE11     9   10   -1516    1289  -3919  -348   195   610  -342  50  10     1</pre>
 *
 * @param{lines} an array of strings representing the lines of the file to parse.
 * @returns an array of shot objects.  To see the form of these objects...just look
 * at the source code below.  It's about as self-explanatory as possible.
 */
module.exports = function(lines) {
  if (typeof lines === 'string') lines = lines.split(/\r\n|\n\r|\r|\n/);

  var result = [];

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    if (line.length >= 78) {
      result.push({
        // name of the to station
        toName:              line.substring( 0,  6).trim(),
        // whether the shot is a surface measurement
        surface:             line.charAt   ( 6    ).toLowerCase() === 's',
        // index of the from station
        fromNum:    parseInt(line.substring( 7, 12)),
        // index of the to station
        toNum:      parseInt(line.substring(12, 17)),
        // x position of the to station
        x:          parseInt(line.substring(17, 25)) / 100,
        // y position of the to station
        y:          parseInt(line.substring(25, 33)) / 100,
        // z position of the to station
        z:          parseInt(line.substring(33, 41)) / 100,
        // x offset of the left wall at to station
        lx:         parseInt(line.substring(41, 46)) / 100,
        // y offset of the left wall at to station
        ly:         parseInt(line.substring(46, 52)) / 100,
        // x offset of the right wall at to station
        rx:         parseInt(line.substring(52, 58)) / 100,
        // y offset of the right wall at to station
        ry:         parseInt(line.substring(58, 64)) / 100,
        // up at to station
        u:          parseInt(line.substring(64, 68)) / 10,
        // down at to station
        d:          parseInt(line.substring(68, 72)) / 10,
        // trip number
        tripNum:    parseInt(line.substring(72, 78))
      });
    }
  }

  return result;
}