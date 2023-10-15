import AbstractCommand from "./AbstractCommand";
import ICommand from "./ICommand";

class MacroCommand extends AbstractCommand {
  private commands: ICommand[];

  constructor(commands: ICommand[]) {
    super();

    this.commands = commands;
  }

  protected doExecute(): void {
    this.commands.forEach((command: ICommand) => {
      command.execute();
    });
  }

  protected doUnexecute(): void {
    this.commands.forEach((command: ICommand) => {
      command.unexecute();
    });
  }
}

export default MacroCommand;
