const path = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: path.resolve(process.cwd(), 'server.js'),
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/dist/',
    filename: 'server.js',
    library: 'app',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      client: path.resolve(process.cwd(), 'src', 'client'),
      components: path.resolve(process.cwd(), 'src/client/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      // {
      //   test: /\.scss$/,
      //   loader: 'css-loader/locals',
      //   options: {
      //     modules: true
      //   }
      // },
      {
        test: /\.(ttf|eot|otf|svg|png)$/,
        loader: 'file-loader?emitFile=false'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader?emitFile=false'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                // minimize: true,
                // exclude: /components/,
                modules: true,
                sourceMap: true,
                // importLoaders: 2,
                context: process.cwd(),
                localIdentName: '[hash:base64:5]'
                // alias: {
                //   'common-assets': this.commonAssetsDir
                // }
              }
            },
            // {
            //   loader: 'postcss-loader',
            //   options: { sourceMap: true }
            // },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
                // includePaths: [
                //   path.resolve(paths.node_modules, 'susy', 'sass'),
                //   path.resolve(
                //     paths.node_modules,
                //     'breakpoint-sass',
                //     'stylesheets'
                //   ),
                //   path.resolve(paths.node_modules, 'font-awesome', 'scss')
                // ]
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css'
    })
    // new HtmlWebpackPlugin({
    //   title: 'Custom templateasdf',
    //   inject: false,
    //   // Load a custom template (lodash by default see the FAQ for details)
    //   template: path.resolve(
    //     process.cwd(),
    //     'src/server/views/template-production.html'
    //   ),
    //   window: {
    //     NODE_ENV: process.env.NODE_ENV
    //   }
    // })
  ]
}
