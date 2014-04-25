
/**
 * Module dependencies.
 */

var clone = require('clone');

/**
 * Expose `transforms`
 */

module.exports = [
  action,
  sessionId,
  alias,
  options,
  providers,
  library,
  segmentjs,
  ios,
  android
];

/**
 * .type -> .action
 */

function action(obj){
  if (obj.type) obj.action = obj.type;
}

/**
 * .anonymousId -> .sessionId
 */

function sessionId(obj){
  if (obj.anonymousId) obj.sessionId = obj.anonymousId;
}

/**
 * .previousId -> .from
 * .userId -> .to
 */

function alias(obj){
  if ('alias' != obj.type) return;
  if (obj.previousId) obj.from = obj.previousId;
  if (obj.userId) obj.to = obj.userId;
}

/**
 * .context -> .options
 */

function options(obj){
  obj.options = obj.context
    ? clone(obj.context)
    : obj.options || {};
}

/**
 * .integrations -> .options.providers
 */

function providers(obj){
  if (!obj.integrations) return;
  obj.options.providers = obj.integrations;
}

/**
 * context.library.name -> options.library
 */

function library(obj){
  var ctx = obj.context;
  if (!ctx) return;
  if (!ctx.library) return;
  if (!ctx.library.name) return;
  obj.options.library = ctx.library.name;
}

/**
 * .options.library = 'analytics.js'
 * .options.library = 'segment.js'
 */

function segmentjs(obj){
  if ('analytics.js' != obj.options.library) return;
  obj.options.library = 'segment.js';
}

/**
 * context.os.* -> options.os*
 * context.device.* -> options.device*
 * context.screen.* -> options.screen*
 * context.app.* -> options.app*
 * context.library.version -> options.library-version
 */

function ios(obj){
  var ctx = obj.context;
  var opt = obj.options;

  if (!ctx) return;
  if (!ctx.library) return;
  if ('analytics-ios' != ctx.library.name) return;

  merge(opt, {
    osVersion: ctx.os.version,
    deviceManufacturer: ctx.device.manufacturer,
    deviceModel: ctx.device.model,
    idForAdvertiser: ctx.device.idfa,
    screenWidth: ctx.screen.width,
    screenHeight: ctx.screen.height,
    appReleaseVersion: ctx.app.version,
    appVersion: ctx.app.build,
    'library-version': ctx.library.version
  });

  opt.os = ctx.os.name;
  delete opt.screen;
  delete opt.device;
  delete opt.app;
}

/**
 * .context.library.version -> options.libraryVersion
 * .context.screen -> options.display
 * .context.app.* -> .options.build.*
 * .context.device.version -> .options.device.release
 */

function android(obj){
  var ctx = obj.context;
  var opt = obj.options;

  if (!ctx) return;
  if (!ctx.library) return;
  if ('analytics-android' != ctx.library.name) return;

  merge(opt, {
    libraryVersion: ctx.library.version,
    display: ctx.screen,
    build: ctx.app,
    device: ctx.device,
  });

  if (opt.device) {
    opt.device.release = opt.device.version;
    opt.device.brand = opt.device.manufacturer;
    delete opt.device.version;
  }

  if (opt.build) {
    opt.build = clone(opt.build);
    opt.build.name = opt.build.version;
    opt.build.code = opt.build.build;
    delete opt.build.version;
    delete opt.build.build;
  }

  delete opt.app;
  delete opt.screen;
  delete opt.locale;
}

/**
 * Merge `b` with `a` if key is not taken and value isn't null.
 *
 * @param {Object} a
 * @param {Object} b
 * @api private
 */

function merge(a, b){
  for (var k in b) {
    if (a.hasOwnProperty(k)) continue;
    if (null == b[k]) continue;
    a[k] = b[k];
  }
}
