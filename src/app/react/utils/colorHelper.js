/**
 * colorHelper — React utility replicating the AngularJS colorHelper constant.
 *
 * Provides tint() and shade() functions that match the SASS mix() algorithm
 * used by the BlurAdmin theme (see theme.constants.js).
 */

function d2h(d) {
  return d.toString(16);
}

function h2d(h) {
  return parseInt(h, 16);
}

function mix(color1, color2, weight) {
  var result = '#';
  for (var i = 1; i < 7; i += 2) {
    var color1Part = h2d(color1.substr(i, 2));
    var color2Part = h2d(color2.substr(i, 2));
    var resultPart = d2h(Math.floor(color2Part + (color1Part - color2Part) * (weight / 100.0)));
    result += ('0' + resultPart).slice(-2);
  }
  return result;
}

export var colorHelper = {
  tint: function (color, weight) {
    return mix('#ffffff', color, weight);
  },
  shade: function (color, weight) {
    return mix('#000000', color, weight);
  },
};
