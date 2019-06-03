const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: '/dist',
    filename: "index_bundle.js"
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: '/dist/index.html',
      /*rewrites: [
        { from: /\/favorite/, to: '/index.html'}
      ]*/
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader","eslint-loader"],
      }, 
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|eof|ttf|eot)$/i,
        use: ["file-loader"]
        /*loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]*/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },{
        test: /\.less$/,
        use: ["less-loader"] // compiles Less to CSS
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
};