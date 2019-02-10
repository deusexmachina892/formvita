const webpack = require('webpack');
const path = require('path');
const htmlWebPackPlugin = require('html-webpack-plugin');

const APP_DIR = path.join(__dirname,'src', 'client');
const BUILD_DIR = path.join(__dirname, 'dist', 'build');
const VENDOR_LIBS = [
    'react', 'react-dom', 'react-router-dom'
]

module.exports = {
    entry: {
        bundle: APP_DIR + '/index.js'
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    module:{
        rules: [
            {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.(png|woff|woff2|eot|ttf|svg|jpe?g)$/,
            loader: 'file-loader',
            query:{
                outputPath: './img/',
                name: '[name].[ext]?[hash]'
            }
        }
     ]
    },
      // optimization
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        // vendor chunk
        vendor: {
          name: 'vendor',
          // sync + async chunks
          chunks: 'all',
          // import file path containing node_modules
          test: /[\\/]node_modules[\\/]/
        }
      }
    }
  },
    devServer:{
        contentBase: BUILD_DIR,
        compress: true,
        port: 3000,
        disableHostCheck: false,
        headers: {
            "X-Custom-header":"custom"
        },
        open: true,
        hot: true
      },
      mode: 'development',
      plugins: [
          new htmlWebPackPlugin({
              template: path.join(__dirname, 'public', 'index.html')
          }),
          new webpack.HotModuleReplacementPlugin()
    ]
}
