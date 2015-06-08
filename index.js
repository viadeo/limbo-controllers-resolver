/**
 * This code is a fork from https://github.com/viadeo/maglev/blob/master/lib/resolvers/node/controller.js
 */

var scripts = require('scripts'),
  path = require('path'),
  fs = require('fs'),
  existsSync = fs.existsSync || path.existsSync; // node <=0.6

var underscore = function(str) {
  str = str.replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2');
  str = str.replace(/([a-z\d])([A-Z])/g, '$1_$2');
  str = str.replace(/-/g, '_');
  return str.toLowerCase();
};

/**
 * Resolve a controller ID to its path on the file system.
 *
 * Given a controller ID of "profile", and the default controller directory of
 * "app/controllers", this algorithm will attempt to locate the file containing
 * the controller by checking for the existence of, in the following order, a
 * file named:
 *
 *   1. app/controllers/profile.js
 *   2. app/controllers/profileController.js
 *   3. app/controllers/profile_controller.js
 *
 * This allows for developers to choose their preferred file naming conventions,
 * each of which is in popular use.
 *
 * This is the default resolution algorithm used to locate controllers within
 * Maglev applications.
 */

module.exports = function(options) {
  if ('string' == typeof options) {
    options = { dirname: options };
  }
  options = options || {};
  var dirname = options.dirname || 'app/controllers',
    extensions = options.extensions,
    dir = path.resolve(dirname);

  return function(id) {
    var longId = id + 'Controller',
      cands = [ id, longId,
                  id.toLowerCase(), longId.toLowerCase(),
                  underscore(id), underscore(longId) ],
      aid, script;

    // TODO: Filter the candidates to a unique set of elements, to optimize
    //       away redundant file exists checks.

    for (var i = 0, len = cands.length; i < len; ++i) {
      aid = path.join(dir, cands[i]);
      script = scripts.resolve(aid, extensions);
      if (existsSync(script)) { return script; }
    }
  };
};
