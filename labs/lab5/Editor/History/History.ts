import ICommand from "../Commands/ICommand";
import IHistory from "./IHistory";

class History implements IHistory {
  private commands: ICommand[];
  private currentActionIndex: number;

  constructor() {
    this.commands = [];
    this.currentActionIndex = -1;
  }

  public canUndo(): boolean {
    return this.currentActionIndex >= 0;
  }

  public canRedo(): boolean {
    return this.commands.length - 1 > this.currentActionIndex;
  }

  public undo(): void {
    if (!this.canUndo()) {
      throw new Error("Can not execute undo action");
    }

    this.commands[this.currentActionIndex].unexecute();
    this.currentActionIndex--;
  }

  public redo(): void {
    if (!this.canRedo()) {
      throw new Error("Can not execute redo action");
    }

    this.currentActionIndex++;
    this.commands[this.currentActionIndex].execute();
  }

  public addAndExecuteCommand(command: ICommand): void {
    const newActionIndex: number = this.currentActionIndex + 1;
    if (this.commands.length < newActionIndex) {
      this.commands.push(command);
    }
    this.commands[newActionIndex] = command;
    this.currentActionIndex = newActionIndex;
    command.execute();
  }
}

export default History;
