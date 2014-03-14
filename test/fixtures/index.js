
module.exports = {
  android: {
    spec: require('./android'),
    legacy: require('./android.out')
  },
  ios: {
    spec: require('./ios'),
    legacy: require('./ios.out'),
  }
};
