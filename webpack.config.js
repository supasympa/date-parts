const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = {
  entry: './src/index.js',
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname),
    library: 'date-parts',
    libraryTarget: 'umd'
  },
  plugins: [new UglifyJsPlugin()]
};
