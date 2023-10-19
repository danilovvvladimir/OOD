import LineByLineReader from "line-by-line";
import Client from "./Client/Client";
import { stdin, exit } from "process";

const rl = new LineByLineReader(stdin);

const client: Client = new Client(rl);
client
  .run()
  .then(() => exit())
  .catch((e) => console.log(e));
