const path = require("path");

module.exports = {
        // 基本路径
        publicPath: "./",
        // 输出文件目录
        outputDir: "dist",
        // eslint-loader 是否在保存的时候检查
        lintOnSave: false,
    }
    // const path = require("path");


// module.exports = {
//     //入口
//     entry: {
//         main: "./src/main.ts",
//     },
//     mode: "",
//     output: {
//         filename: "build.js",
//         path: path.resolve(__dirname, "/dist"),
//         publicPath: "/"
//     },
//     //本地服务器
//     devServer: {
//         contentBase: "dist"
//     },
//     module: {
//         rules: [{
//             test: /\.scss$/,
//             use: [{
//                     loader: "vue-style-loader"
//                 },
//                 {
//                     loader: "css-loader"
//                 }
//             ]
//         }]
//     }

// }