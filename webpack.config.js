const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: {
    // Прописывай для каждого таска точку входа и имя.
    //  Пример: SimUDuckExtra: "./labs/lab1/SimUDuckExtra/main.ts",
    Slides: "./labs/lab7/Slides/main.ts",
    GumballMachine: "./labs/lab8/GumballMachine/main.ts",
    MultiGumballMachine: "./labs/lab8/MultiGumballMachine/main.ts",
    MultiGumballMachineRefill: "./labs/lab8/MultiGumballMachineRefill/main.ts",
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
