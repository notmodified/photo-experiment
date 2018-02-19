
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
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.scss?$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'postcss-loader', 'sass-loader'],
      }
    ],
  },
}

module.exports = config;
