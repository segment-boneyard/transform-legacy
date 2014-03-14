
module.exports = {
  integrations: {
    "Tapstream": false,
    "Amplitude": false,
    "Localytics": false,
    "Flurry": false,
    "Countly": false,
    "Bugsnag": false,
    "Quantcast": false,
    "Crittercism": false,
    "Google Analytics": false,
    "Omniture": false,
    "Mixpanel": { key: 1 }
  },
  context: {
    library: {
      name: 'analytics-android',
      version: '0.4.4'
    },
    telephony: {
      radio: 'gsm',
      carrier: 'FI elisa'
    },
    wifi: {
      connected: false,
      available: false
    },
    location: {
      speed: 0,
      longitude: 24.937207,
      latitude: 60.2495497
    },
    locale: {
      language: 'English',
      country: 'United States'
    },
    device: {
      version: '4.2.2',
      manufacturer: 'samsung'
    },
    ip: '80.186.195.102',
    inferredIp: true,
    screen: {
      density: 1.5,
      width: 800,
      height: 480
    },
    app: {
      version: '1.0',
      build: 1
    }
  }
}
