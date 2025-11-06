const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  // Multiples entradas: main widget y ventana de configuración inicial
  entry: {
    main: './renderer/src/index.tsx',
    config: './renderer/src/configWindow/index.tsx'
  },
  target: 'electron-renderer',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'renderer/src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist/renderer'),
    filename: '[name].bundle.js',
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './renderer/public/index.html',
      filename: 'index.html',
      chunks: ['main'],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: './renderer/public/config.html',
      filename: 'config.html',
      chunks: ['config'],
      inject: true,
    }),
  ],
};
