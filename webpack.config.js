const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
},
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
    assetModuleFilename: '[name][ext]'
  },

  plugins: [
    new HtmlWebpackPlugin({
        title: 'Webpack Project',
        filename: 'index.html',
        template: 'src/template.html'
    })
],

devtool: 'source-map',

devServer: {
    static: {
        directory: path.resolve(__dirname, 'dist')
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true
},

module: { 
    rules: [
        {
            test: /\.scss$/i,
            use: [
                'style-loader',
                'css-loader',
                'resolve-url-loader',
                'sass-loader'
            ]
        },
    ]
}

};