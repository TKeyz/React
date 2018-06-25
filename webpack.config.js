const path = require('path');

module.exports = {
	//mode: 'development',
	entry: './src/js/App.js',
	output: {
		path: path.join(__dirname, '/theme/js'),
		filename: 'client.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				},
			}
		]
	}
}