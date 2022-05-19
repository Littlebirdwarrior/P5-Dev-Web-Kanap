// const path = require('path');
//
// module.exports = {
//     mode: "production",
//     entry: {
//         polyfill: "babel-polyfill",
//         'bundle.js': [
//             "jquery",
//             path.resolve(__dirname, 'js/basket.js'),
//             path.resolve(__dirname, 'js/index.js')
//         ]
//     },
//     output: {
//         filename: "[name].bundle.js",
//         path: path.resolve(__dirname, "dist")
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: "babel-loader",
//                     options: {
//                         presets: ["@babel/preset-env"]
//                     }
//                 }
//             }
//         ]
//     }
// };
