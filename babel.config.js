/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: './',
        alias: {
          '@': path.resolve(__dirname, './src/'),
        },
      },
    ],
  ],
};
