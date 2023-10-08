const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: {
    // Прописывай для каждого таска точку входа и имя.
    //  Пример: SimUDuckExtra: "./labs/lab1/SimUDuckExtra/main.ts",
    // Shapes: "./labs/lab1/Shapes/main.ts",
    // WeatherStation: "./labs/lab2/WeatherStation/main.ts",
    WeatherStationSecure: "./labs/lab2/WeatherStationSecure/main.ts",
    WeatherStationPriority: "./labs/lab2/WeatherStationPriority/main.ts",
    // WeatherStationDuo: "./labs/lab2/WeatherStationDuo/main.ts",
    // WeatherStationPro: "./labs/lab2/WeatherStationPro/main.ts",
    WeatherStationProDuo: "./labs/lab2/WeatherStationProDuo/main.ts",
    WeatherStationProLite: "./labs/lab2/WeatherStationProLite/main.ts",
    Coffee: "./labs/lab3/Coffee/main.ts",
    Streams: "./labs/lab3/Streams/main.ts",
    Factory: "./labs/lab4/Factory/main.ts",
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
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new CleanWebpackPlugin()],
};
