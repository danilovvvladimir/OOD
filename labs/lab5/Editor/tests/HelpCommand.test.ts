import HelpCommand from "../Commands/HelpCommand";
import ICommand from "../Commands/ICommand";

describe("test help command", () => {
  const log = console.log;

  beforeEach(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = log;
  });

  test("execute help command with empty commands list", () => {
    const helpCommand: HelpCommand = new HelpCommand(
      [],
      new Map<string, string>(),
    );

    helpCommand.execute();

    expect(console.log as jest.Mock).toBeCalledTimes(0);
  });

  test("execute help command with commands list with one command", () => {
    const availableCommands: string[] = ["List"];
    const availableCommandDescriptions: Map<string, string> = new Map<
      string,
      string
    >();
    availableCommandDescriptions.set(
      "list",
      "shows list of items of the document",
    );
    const helpCommand: ICommand = new HelpCommand(
      availableCommands,
      availableCommandDescriptions,
    );

    helpCommand.execute();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "List — shows list of items of the document",
    );
  });

  test("execute help command with commands list with two commands", () => {
    const availableCommands: string[] = ["List", "Help"];
    const availableCommandDescriptions: Map<string, string> = new Map<
      string,
      string
    >();
    availableCommandDescriptions.set(
      "list",
      "shows list of items of the document",
    );
    availableCommandDescriptions.set(
      "help",
      "shows lsit of available commands",
    );
    const helpCommand: ICommand = new HelpCommand(
      availableCommands,
      availableCommandDescriptions,
    );

    helpCommand.execute();

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      "List — shows list of items of the document",
    );
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      "Help — shows lsit of available commands",
    );
  });
});
