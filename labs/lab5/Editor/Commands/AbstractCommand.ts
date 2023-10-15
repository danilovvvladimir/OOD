import ICommand from "./ICommand";

abstract class AbstractCommand implements ICommand {
  private executed: boolean;

  constructor() {
    this.executed = false;
  }

  public execute(): void {
    this.executed = true;
    this.doExecute();
  }

  public unexecute(): void {
    if (this.executed) {
      this.doUnexecute();
    }
  }

  protected abstract doExecute(): void;

  protected abstract doUnexecute(): void;
}

export default AbstractCommand;
