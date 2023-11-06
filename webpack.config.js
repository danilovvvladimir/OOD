const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: {
    // Прописывай для каждого таска точку входа и имя.
    //  Пример: SimUDuckExtra: "./labs/lab1/SimUDuckExtra/main.ts",
    Slides: "./labs/lab7/Slides/main.ts",
    // Slides1: "./labs/lab8/main.ts",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.node$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".node"],
  },
  externals: {
    canvas: "commonjs canvas",
  },
  plugins: [new CleanWebpackPlugin()],
};
