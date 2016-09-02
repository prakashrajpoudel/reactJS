var webpack = require("webpack");
var path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");

var BASE_DIR = path.resolve(__dirname, 'src/client');
var DEPLOY_DIR = BASE_DIR;
var BUILD_DIR = BASE_DIR + '/public';
var APP_DIR = BASE_DIR + '/app';
var CSS_DIR = BASE_DIR + '/css';

var PROD = JSON.parse(process.env.PROD_ENV || '0');

var config = {
	context: path.join(__dirname, 'app'),
	entry: APP_DIR + '/index.jsx',
	devtool: 'source-map',
	devServer: { 
	   outputPath: path.join(__dirname, 'build')
	},
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
		}), new CopyWebpackPlugin([{ 
		context: path.resolve(__dirname), 
		from: 'node_modules/bootstrap/dist/css', 
		to: path.resolve(__dirname) + '/src/client/css'}])],
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
