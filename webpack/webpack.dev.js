var webpack = require('webpack');
var path = require("path");
var externals = require("./externals");

var commonEntry = ['webpack-hot-middleware/client?path=http://localhost:8089/__webpack_hmr&reload=true'];

module.exports = {
    devtool: 'sourcemap',
    debug: true,
    entry: {
        main: commonEntry.concat(['./index.tsx'])
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: ['babel-loader', 'ts-loader']
            }
        ]
    },
  	output: {
          filename: '[name].js',
          path: __dirname + "/static/",
          publicPath: "/static/",
          include: __dirname
  	},
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        })
    ],
    resolve: {
        extensions: ['', '.jsx', '.js', '.tsx', '.ts', '.css'],
        alias: {
            "helpers":  path.resolve(__dirname, "../helpers/"),
            "lib":  path.resolve(__dirname, "../lib/")
        }
    },
    babel: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: [
            ["import", { "libraryName": "antd", "libraryDirectory": "lib", "style": "css" }] // `style: true` for less
          ]
    },
    externals: externals
};
