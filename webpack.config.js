
const config = {
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: __dirname + '/dist',
    publicPath: '/photo-experiment/dist/',
  },
  devServer: {
    contentBase: __dirname,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules(?!\/striptags)/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.scss?$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'postcss-loader'],
      },
      {
        test: /\.worker\.js$/,
        exclude: /node_modules/,
        loaders: [{loader: 'worker-loader', options: {}}, { loader: 'babel-loader' }],
      }
    ],
  },
}

module.exports = config;
