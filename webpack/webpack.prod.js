var webpack = require('webpack');
var path = require("path");
var externals = require("./externals");
//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        main: './index.tsx'
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader!ts-loader',
                exclude: [
                    "node_modules"
                ]
            }
        ],
        noParse: Object.keys(externals)
    },
    output: {
        filename: '[name].js',
        path: "./static/"
    },
    resolve: {
        extensions: ['', '.jsx', '.js', '.tsx', '.ts'],
        alias: {
            "helpers":  path.resolve(__dirname, "../helpers/"),
            "lib":  path.resolve(__dirname, "../lib/")
        }
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // new BundleAnalyzerPlugin({
        //     openAnalyzer: false
        // }),
        new webpack.ProgressPlugin(function handler(percentage, msg) {
            var line = "Processing " + msg + "\t" + Math.floor(percentage * 100) + "%";
            console.log(line);
        })
    ],
    externals: externals
};
