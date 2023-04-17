var htmlWebpackPlugin = require('html-webpack-plugin')
var cleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	entry: __dirname + '/www/index.js',
	output: {
		path: __dirname + '/public',
		filename: 'bundle.js',
	},
	resolve: {
		alias: {
			api: __dirname + '/www/api.js',
		},
	},
	module: {
		rules: [
			{
				test: /\.js?/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						query: {
							presets: ['es2015', 'react'],
						},
					},
				],
			},
			{
				test: /\.css?/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						query: {
							modules: true,
							localIdentName: '[local]',
						},
					},
				],
			},
			{
				test: /\.(svg|ttf|eot|woff|woff2)$/,
				use: [
					{
						loader: 'url-loader',
						query: {
							limit: 5000,
							name: 'asset/fonts/[name]__[hash].[ext]',
						},
					},
				],
			},
		],
	},
	plugins: [
		new cleanWebpackPlugin('./public', {
			root: __dirname,
			exclude: ['.gitkeep'],
		}),
		new htmlWebpackPlugin({
			title: 'Kakao API',
			template: 'www/template.html',
			hash: true,
		}),
	],
}
