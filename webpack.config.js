var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: {
        app: "./assets/modules/index.js",
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "fruitage.js",
    },
    externals: {
       jquery: 'jQuery'
     },
     plugins: [
       new webpack.ProvidePlugin({
         $: 'jquery',
       })
     ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
            },
        ],
    },
};