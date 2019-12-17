module.exports = {
  entry: __dirname + '/client/index.js',
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_moodules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public'
  }
};