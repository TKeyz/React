module.exports = {
	entry: './assets/js/main.js',
	output: {
		filename: './theme/js/client.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: "babel-loader"
		}]
	}
}