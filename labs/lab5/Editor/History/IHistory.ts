import ICommand from "../Commands/ICommand";

interface IHistory {
  canUndo(): boolean;
  undo(): void;
  canRedo(): boolean;
  redo(): void;
  addAndExecuteCommand(command: ICommand): void;
}

export default IHistory;
