var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');
var DEPLOY_DIR = path.resolve(__dirname, 'src/client');

var PROD = JSON.parse(process.env.PROD_ENV || '0');

var config = {
	entry: APP_DIR + '/index.jsx',
	devtool: 'source-map',
	output: {
	  path: BUILD_DIR,
//	  filename: 'bundle.js',
	  filename: PROD ? 'bundle.min.js' : 'bundle.js'
	},
	plugins: PROD ? [new webpack.optimize.UglifyJsPlugin({
		compress : {warnings: false}
		})] : [new HtmlWebpackPlugin({
		  title : 'Sample',
		  filename : DEPLOY_DIR + '/index.html',
		  template : APP_DIR + '/index.ejs'
		})],
	resolve: {
	  extensions: ['', '.js', '.jsx']
	},
	module: {
	  loaders : [
	    {
	      test: /\.jsx?/,
  	      include: APP_DIR,
	      exclude: 'node_modules/',
	      loader: 'babel',
	      query: {
		  presets: ['es2015','react']
		}
	    }
	  ]
	}
   };
module.exports = config;
