var path = require('path')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports  = {
	entry: {
		bundle: './src/app.js',
		vendor: ['react']
	},
	output: {
		path:path.resolve(__dirname,'./dist/'),
		filename:'bundle.js'
	},
	module: {
		loaders:[
			{
				test:/\.js[x]?$/,
				exclude:/node_modules/,
				loader:'babel-loader',
				query:{
					presets: ['es2015','react','stage-0']
				},
				exclude: /node_modules/
			},
			{
				test:/\.(png|jpg|gif)$/,
				loader:'file-loader',
				exclude: /node_modules/
			},
			{
				test:/\.css$/,
				loader:'style-loader!css-loader',
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'my app',
			template: 'template/index.html',
			hash: true,
			inject: 'body'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
	        compress: {
	          warnings: false
	        },
	        output: {
	        	comments: false
	        }

      	}),
      	new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename:'react.js',minChunks:Infinity})
	]

}