
/**
 * Module dependencies.
 */

var transforms = require('./transforms');
var clone = require('clone');

/**
 * Expose `transform`
 */

module.exports = transform;

/**
 * Transform spec'ed `msg` to legacy `msg`.
 *
 * @param {Object} msg
 * @return {Object}
 * @api public
 */

function transform(msg){
  var ret = msg;
  if (1 != ret.version) return ret;
  ret = clone(msg);
  for (var i = 0, fn; fn = transforms[i]; ++i) fn(ret);
  return ret;
}
