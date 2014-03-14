
module.exports = {
  integrations: {
    'Google Analytics': false,
     Bugsnag: false,
     Amplitude: false,
     Countly: false,
     Crittercism: false,
     Flurry: false,
     Tapstream: false,
     Mixpanel: false,
     Localytics: false
  },
  context: {
    library: {
      name: 'analytics-ios',
      version: '0.9.9'
    },
    traits: {},
    os: {
      name: 'iPhone OS',
      version: '7.0.3'
    },
    device: {
      idfa: '4449FE88-2FCA-4207-BC58-9FACBDE88F6B',
      model: 'x86_64',
      manufacturer: 'Apple'
    },
    screen: {
      width: 320,
      height: 568
    },
    app: {
      version: '1.0',
      build: '1.0'
    }
  }
};
