
var transform = require('..');
var assert = require('assert');
var fixtures = require('./fixtures')

describe('transform(msg)', function(){
  it('should clone', function(){
    var msg = { version: 2, context: {} };
    assert(msg != transform(msg));
  })

  it('should not clone if version isnt 1 and return the object', function(){
    var msg = {};
    assert(msg == transform(msg));
  })

  describe('options', function(){
    it('should clone .context if available', function(){
      var msg = { version: 2, context: {} };
      assert(transform(msg).options);
      assert(msg.context != transform(msg).options);
    })

    it('should clone use .options if available', function(){
      var msg = { version: 2, options: {} };
      assert(transform(msg).options);
      assert(transform(msg).options != msg.options);
    })

    it('should use a new object if .context and .options are missing', function(){
      assert(transform({ version: 2 }).options)
    })
  })

  describe('action', function(){
    it('.type -> .action', function(){
      var msg = message({ version: 2, type: 'track' });
      assert('Track' == transform(msg).action);
    });
  });

  describe('alias', function(){
    it('.previousId -> .from', function(){
      var msg = message({ version: 2, previousId: 'baz', type: 'alias' });
      assert(msg.previousId == transform(msg).from);
      assert(msg.previousId == transform(msg).previousId);

    })
    it('.userId -> .to', function(){
      var msg = message({ version: 2, userId: 'baz', type: 'alias' });
      assert(msg.userId == transform(msg).to);
      assert(msg.userId == transform(msg).userId);
    })
  })

  describe('.sessionId', function(){
    it('.anonymousId -> .sessionId', function(){
      var msg = message({ version: 2, anonymousId: 'id' });
      assert('id' == transform(msg).sessionId);
      assert('id' == transform(msg).anonymousId);
    })
  })

  describe('.options.providers', function(){
    it('.integrations -> .options.integrations', function(){
      var msg = message({ version: 2, integrations: { key: 1 } });
      var t = transform(msg);
      assert(1 == t.integrations.key);
      assert(1 == t.options.providers.key);
    })
  })

  describe('.context.library', function(){
    it('.context.library.name -> .options.library', function(){
      var msg = message({ version: 2, context: { library: 'baz' } });
      var t = transform(msg);
      assert('baz' == t.options.library);
    })
  })

  describe('library = analytics.js', function(){
    it('analytics.js -> segment.js', function(){
      var msg = message({ version: 2, context: { library: 'analytics.js' } });
      var t = transform(msg);
      assert('segment.js' == t.options.library);
    })
  })

  describe('version', function(){
    it('should convert v2 messages', function(){
      var msg = message({ version: 2, userId: 'baz', type: 'alias' });
      var t = transform(msg);
      assert(msg != transform(msg));
    });
  
    it('should not convert v1 messages', function(){
      var msg = message({ version: 1, anonymousId: 'baz', type: 'track' });
      var t = transform(msg);
      assert(t == msg);
    })

    it('should change .version', function(){
      var msg = message({ version: 2, type: 'identify', userId: 'foo' });
      var t = transform(msg);
      assert(1 == t.version);
    })
  })

  describe('android', function(){
    it('should update .options using new .context', function(){
      var spec = message(fixtures.android.spec);
      var legacy = message(fixtures.android.legacy);
      var t = transform(spec);
      assert.deepEqual(t.options, legacy.context);
      assert.deepEqual(t.options.providers, spec.integrations);
      assert.deepEqual(t.context, spec.context);
    })
  })

  describe('ios', function(){
    it('should update .options using new .context', function(){
      var spec = message(fixtures.ios.spec);
      var legacy = message(fixtures.ios.legacy);
      var t = transform(spec);
      assert.deepEqual(t.options, legacy.options);
      assert.deepEqual(t.options.providers, spec.integrations);
      assert.deepEqual(t.context, spec.context);
    })
  })
})

function message(obj){
  var ret = { version: 1 };
  for (var k in obj) ret[k] = obj[k];
  return ret;
}
