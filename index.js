var template = require('lodash/string/template');
var padLeft = require('lodash/string/padLeft');

var templates = {};

function splitDate(date) {
  var YY = date.getFullYear();
  var M = date.getMonth() + 1;
  var D = date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  return {
    Y: String(YY).substr(-2),   // short year (15 for 2015)
    YY: YY,                     // numeric long year
    M: M,                       // numeric month (9 for September)
    MM: padLeft(M, 2, '0'),     // padded month ('09' for September)
    D: D,                       // numeric day
    DD: padLeft(D, 2, '0'),     // padded day
    h: h,                       // numeric hours
    hh: padLeft(h, 2, '0'),     // padded hours
    m: m,                       // numeric minutes
    mm: padLeft(m, 2, '0'),     // padded minutes
    s: s,                       // numeric secs
    ss: padLeft(s, 2, '0')      // padded secs
  };
}

function shallowCopy(a, b) {
  if (b) {
    for (var k in b) {
      if (b.hasOwnProperty(k)) {
        a[k] = b[k];
      }
    }
  }
  return a;
}

function getOptions(options) {
  var defaults = {
    template: '<%= YY %>-<%= MM %>-<%= DD %>'
  };
  return shallowCopy(defaults, options);
}

function formatDate(d, options) {
  options = getOptions(options);
  var formatter = options.template;
  if (typeof formatter === 'string') {
    // compile the template just once
    formatter = ( templates[formatter] = templates[formatter] || template(formatter) );
  }
  return formatter(splitDate(d));
}

module.exports = formatDate;