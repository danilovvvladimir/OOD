import { createInterface } from "readline";
import { app } from "./App/App";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Should we use new API (y)?", (answer) => {
  switch (answer.toLowerCase()) {
    case "y":
    case "Y":
      app.paintPictureOnModernGraphicsRenderer();
      break;
    default:
      app.paintPictureOnCanvas();
      break;
  }

  rl.close();
});
