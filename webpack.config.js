const glob = require('glob');
const modules = glob.sync('./app/src/modules/**/*.ts');

const backgroundConfig = {
  entry: modules.concat(['./app/src/background.ts']),
  output: {
    path: './app/dist',
    filename: 'background.js',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  module: {
    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
};

const popupConfig = {
  entry: modules.concat(['./app/src/popup.ts']),
  output: {
    path: './app/dist',
    filename: 'popup.js',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  module: {
    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
};

module.exports = [backgroundConfig, popupConfig];
