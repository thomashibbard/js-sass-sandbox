const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  context: __dirname,
  entry: {
    bundle: path.resolve(process.cwd(), 'src', 'client', 'App.js'),
    unauth: path.resolve(
      process.cwd(),
      'src',
      'client',
      'UnAuthenticatedApp.js'
    )
  },
  output: {
    path: process.cwd() + '/dist',
    publicPath: '',
    filename: 'scripts/[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  module: {
    rules: [
      // {
      //   test: /\.pug$/,
      //   loader: 'pug-loader'
      // },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: 'html-loader',
      //       options: {
      //         minimize: true
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.scss$/,
        use: [
          // MiniCssExtractPlugin.loader,
          { loader: 'style-loader', options: { sourceMap: true } },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              context: process.cwd(),
              localIdentName: '[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [require('autoprefixer')]
            }
          },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'AUTH',
      inject: false,
      // Load a custom template (lodash by default see the FAQ for details)
      template: path.resolve(process.cwd(), 'src/server/views/template.html'),
      window: {
        NODE_ENV: process.env.NODE_ENV
      },
      alwaysWriteToDisk: true,
      templateParameters: {
        html: '<%=html%>'
      }
    }),
    new HtmlWebpackPlugin({
      title: 'UN AUTH',
      inject: false,
      // Load a custom template (lodash by default see the FAQ for details)
      template: path.resolve(
        process.cwd(),
        'src/server/views/template-unauthenticated.html'
      ),
      window: {
        NODE_ENV: process.env.NODE_ENV
      },
      alwaysWriteToDisk: true,
      templateParameters: {
        html: '<%=html%>'
      }
    }),
    new HtmlWebpackHarddiskPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    //   chunkFilename: '[id].css'
    // }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    })
  ],
  devServer: {
    // historyApiFallback: true,
    stats: 'errors-only',
    disableHostCheck: true,
    port: 5000,
    overlay: {
      errors: true,
      warnings: true
    },
    proxy: {
      '/': {
        target: 'http://localhost:5010'
      }
    }
  }
}
