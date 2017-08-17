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
	performance: {
  		hints: false
	},
	module: {
		loaders:[
			{
				test:/\.js[x]?$/,
				exclude:/node_modules/,
				loader:'babel-loader',
				query:{
					presets: ['es2015','react','stage-0','stage-1']
				},
				exclude: /node_modules/
			},
			{
				test:/\.(png|jpg|gif)$/,
				loader:'file-loader',
				exclude: /node_modules/
			}, 
			{
			    test: /\.css$/,
			    loaders: [
			        'style-loader?sourceMap',
			        'css-loader?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]'
			    ],
			    exclude:path.resolve(__dirname,'src/styles')
			},
			{
				test:/\.css$/,
				loader:'style-loader!css-loader',
				include:path.resolve(__dirname,'src/styles')
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
	          warnings: false,
	          drop_debugger: true,
              drop_console: true
	        },
	        output: {
	        	comments: false
	        }

      	}),
      	new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename:'react.js',minChunks:Infinity})
	]

}