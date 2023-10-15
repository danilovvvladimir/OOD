interface ICommand {
  execute(): void;
  unexecute(): void;
}

export default ICommand;
