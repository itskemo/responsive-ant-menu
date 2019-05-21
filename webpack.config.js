const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const path = require('path');
//
// module.exports = {
//     mode: 'production',
//     entry: './src/AntMenuResponsive.js',
//     output: {
//         path: path.resolve('dist'),
//         filename: 'bundle.js',
//         libraryTarget: 'commonjs2'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.jsx?$/,
//                 exclude: /(node_modules)/,
//                 use: 'babel-loader'
//             },
//             {
//                 test: /\.css$/,
//                 use: [MiniCssExtractPlugin.loader, "css-loader"]
//             }
//         ]
//     },
//     plugins: [
//         new MiniCssExtractPlugin({
//             filename: "[name].css",
//             chunkFilename: "[id].css"
//         })
//     ]
// };

const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "examples/src/index.html"),
    filename: "./index.html"
});
module.exports = {
    entry: path.join(__dirname, "examples/src/index.js"),
    output: {
        path: path.join(__dirname, "examples/dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        htmlWebpackPlugin,
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        port: 3001
    }
};
