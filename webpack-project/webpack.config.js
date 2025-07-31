const path = require("path");

module.exports = {
  entry: "./src/index.js", // 入口文件
  output: {
    filename: "bundle.js", // 输出文件名
    path: path.resolve(__dirname, "dist"), // 输出目录
  },
  mode: "development", // 可以设置为 'production' 以进行优化和压缩
  devtool: "source-map", //查看打包后的代码更方便
};
