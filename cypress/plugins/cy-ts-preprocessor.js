const wp = require('@cypress/webpack-preprocessor')

const webpackOptions = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }, {
          loader: 'angular2-template-loader?keepUrl=true'
        }],
        exclude: [/node_modules/],
      },
      {
        test: /\.(css)$/,
        loaders: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.(html)$/,
        loader: 'raw-loader'
      },
      // {
      //   test: /\.async\.(html)$/,
      //   loaders: ['file?name=[name].[hash].[ext]', 'extract']
      // }
      // {
      //   test: /\.(html|css)$/,
      //   loader: 'raw-loader',
      //   exclude: /\.async\.(html|css)$/
      // },
      // {
      //   test: /\.async\.(html|css)$/,
      //   loaders: ['file?name=[name].[hash].[ext]', 'extract']
      // }
    ]
  }
}

const options = {
  webpackOptions
}

module.exports = wp(options)
