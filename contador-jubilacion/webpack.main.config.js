const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  // Definimos múltiples entry points para generar también preload.js
  entry: {
    index: './main/index.ts',
    preload: './main/preload.ts'
  },
  target: 'electron-main',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist/main'),
    // [name] => index.js y preload.js
    filename: '[name].js',
    clean: true
  },
  node: {
    __dirname: false,
    __filename: false,
  },
};
