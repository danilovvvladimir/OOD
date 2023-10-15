import AbstractCommand from "./AbstractCommand";

class HelpCommand extends AbstractCommand {
  private availableCommands: string[];
  private availableCommandDescriptions: Map<string, string>;

  constructor(
    availableCommands: string[],
    availableCommandDescriptions: Map<string, string>,
  ) {
    super();

    this.availableCommands = availableCommands;
    this.availableCommandDescriptions = availableCommandDescriptions;
  }

  protected doExecute(): void {
    this.availableCommands.forEach((availableCommand: string) => {
      console.log(
        availableCommand +
          " — " +
          this.availableCommandDescriptions.get(availableCommand.toLowerCase()),
      );
    });
  }

  protected doUnexecute(): void {}
}

export default HelpCommand;
