/* eslint-disable @typescript-eslint/no-explicit-any */

import LineByLineReader from "line-by-line";
import ICommand from "../Commands/ICommand";
import HelpCommand from "../Commands/HelpCommand";
import InsertParagraphCommand from "../Commands/InsertParagraphCommand";
import IHistory from "../History/IHistory";
import History from "../History/History";
import Document from "../Document/Document";
import InsertImageCommand from "../Commands/InsertImageCommand";
import SetTitleCommand from "../Commands/SetTitleCommand";
import ListCommand from "../Commands/ListCommand";
import ReplaceTextCommand from "../Commands/ReplaceTextCommand";
import ResizeImageCommand from "../Commands/ResizeImageCommand";
import DeleteItemCommand from "../Commands/DeleteItemCommand";
import MacroCommand from "../Commands/MacroCommand";
import UndoCommand from "../Commands/UndoCommand ";
import RedoCommand from "../Commands/RedoCommand";
import SaveCommand from "../Commands/SaveCommand";
import Parser from "../Parser/Parser";

class Client {
  private readableStream: LineByLineReader;

  constructor(stream: LineByLineReader) {
    this.readableStream = stream;
  }

  public run(): Promise<void> {
    const availableCommands: string[] = [
      "InsertParagraph",
      "InsertImage",
      "SetTitle",
      "List",
      "ReplaceText",
      "ResizeImage",
      "DeleteItem",
      "Help",
      "Undo",
      "Redo",
      "Save",
      "BeginMacro",
      "EndMacro",
      "Exit",
    ];

    const macroCommandsMap: Map<string, ICommand> = new Map<string, ICommand>();
    const availableCommandDescriptions: Map<string, string> = new Map<
      string,
      string
    >();

    availableCommandDescriptions.set(
      "insertparagraph",
      "<position> <text> — inserting paragraph",
    );

    availableCommandDescriptions.set(
      "insertimage",
      "<position> <width> <height> <path> — inserting image",
    );

    availableCommandDescriptions.set(
      "settitle",
      "<text> — sets title to the current document",
    );

    availableCommandDescriptions.set("list", "shows items in current document");

    availableCommandDescriptions.set(
      "replacetext",
      "<position> <text> — replaces text of paragraph",
    );

    availableCommandDescriptions.set(
      "resizeimage",
      "<position> <width> <height> — resizes image",
    );

    availableCommandDescriptions.set(
      "deleteitem",
      "<position> — deletes item in the specific position",
    );

    availableCommandDescriptions.set(
      "help",
      "shows list of available commands",
    );

    availableCommandDescriptions.set("undo", "reverts last command");
    availableCommandDescriptions.set("redo", "reverts last reverted command");
    availableCommandDescriptions.set(
      "save",
      "saves document as html file to the specific path",
    );

    availableCommandDescriptions.set("exit", "closes the program");

    availableCommandDescriptions.set(
      "beginmacro",
      "<macrocommand name> <macrocommand description> — starts recording new macrocommand",
    );

    availableCommandDescriptions.set(
      "endmacro",
      "stops recording macrocommand",
    );

    const helpCommand: ICommand = new HelpCommand(
      availableCommands,
      availableCommandDescriptions,
    );

    helpCommand.execute();

    const history: IHistory = new History();
    const document: Document = new Document(history);

    enum AvailableCommand {
      InsertParagraph = "insertparagraph",
      InsertImage = "insertimage",
      SetTitle = "settitle",
      List = "list",
      ReplaceText = "replacetext",
      ResizeImage = "resizeimage",
      DeleteItem = "deleteitem",
      Help = "help",
      Undo = "undo",
      Redo = "redo",
      Save = "save",
      Exit = "exit",
      BeginMacro = "beginmacro",
      EndMacro = "endmacro",
    }

    return new Promise<void>((resolve, reject) => {
      let isMacroCommandRecording: boolean = false;
      let newMacroCommandName: string = "";
      let newMacroCommandDescription: string = "";
      let macroCommands: ICommand[] = [];

      const processClientsMessages = (line: string) => {
        const args: string[] = line.split(" ");

        switch (args[0].toLowerCase()) {
          case AvailableCommand.InsertParagraph:
            try {
              const parsedArgs: any[] = Parser.parseInsertParagraphArgs(
                args.slice(1, args.length),
                document.getItemsCount(),
              );
              const insertParagraphCommand: ICommand =
                new InsertParagraphCommand(
                  document,
                  parsedArgs[1],
                  parsedArgs[0],
                );
              if (!isMacroCommandRecording) {
                history.addAndExecuteCommand(insertParagraphCommand);
                console.log("Inserting paragraph was successfully executed");
              } else {
                macroCommands.push(insertParagraphCommand);
              }
            } catch (e) {
              console.log(String(e));
            }
            break;
          case AvailableCommand.InsertImage:
            try {
              const parsedArgs: any[] = Parser.parseInsertImageArgs(
                args.slice(1, args.length),
                document.getItemsCount(),
              );
              const insertImageCommand: ICommand = new InsertImageCommand(
                document,
                parsedArgs[3],
                parsedArgs[1],
                parsedArgs[2],
                parsedArgs[0],
              );
              if (!isMacroCommandRecording) {
                history.addAndExecuteCommand(insertImageCommand);
                console.log("Inserting image was successfully executed");
              } else {
                macroCommands.push(insertImageCommand);
              }
            } catch (e) {
              console.log(String(e));
            }
            break;
          case AvailableCommand.SetTitle:
            try {
              const parsedArgs: any[] = Parser.parseSetTitleArgs(
                args.slice(1, args.length),
              );
              const setTitleCommand: ICommand = new SetTitleCommand(
                document,
                parsedArgs[0],
              );
              if (!isMacroCommandRecording) {
                history.addAndExecuteCommand(setTitleCommand);
                console.log("Setting title was successfully executed");
              } else {
                macroCommands.push(setTitleCommand);
              }
            } catch (e) {
              console.log(String(e));
            }
            break;
          case AvailableCommand.List:
            try {
              const listCommand: ICommand = new ListCommand(document);
              if (!isMacroCommandRecording) {
                listCommand.execute();
              } else {
                macroCommands.push(listCommand);
              }
            } catch (e) {
              console.log(String(e));
            }
            break;
          case AvailableCommand.ReplaceText:
            try {
              const parsedArgs: any[] = Parser.parseReplaceTextArgs(
                args.slice(1, args.length),
                document.getItemsCount(),
              );
              const replaceTextCommand: ICommand = new ReplaceTextCommand(
                document,
                parsedArgs[1],
                parsedArgs[0],
              );
              if (!isMacroCommandRecording) {
                history.addAndExecuteCommand(replaceTextCommand);
                console.log("Replacing text was successfully executed");
              } else {
                macroCommands.push(replaceTextCommand);
              }
            } catch (e) {
              console.log(String(e));
            }
            break;
          case AvailableCommand.ResizeImage:
            try {
              const parsedArgs: any[] = Parser.parseResizeImageArgs(
                args.slice(1, args.length),
                document.getItemsCount(),
              );
              const resizeImageCommand: ICommand = new ResizeImageCommand(
                document,
                parsedArgs[1],
                parsedArgs[2],
                parsedArgs[0],
              );
              if (!isMacroCommandRecording) {
                history.addAndExecuteCommand(resizeImageCommand);
                console.log("Resizing image was successfully executed");
              } else {
                macroCommands.push(resizeImageCommand);
              }
            } catch (e) {
              console.log(String(e));
            }
            break;
          case AvailableCommand.DeleteItem:
            try {
              const parsedArgs: any[] = Parser.parseDeleteItemArgs(
                args.slice(1, args.length),
                document.getItemsCount(),
              );
              const deleteItemCommand: ICommand = new DeleteItemCommand(
                document,
                parsedArgs[0],
              );
              if (!isMacroCommandRecording) {
                history.addAndExecuteCommand(deleteItemCommand);
                console.log("Deleting item was successfully executed");
              } else {
                macroCommands.push(deleteItemCommand);
              }
            } catch (e) {
              console.log(String(e));
            }
            break;
          case AvailableCommand.Help:
            try {
              const helpCommand: ICommand = new HelpCommand(
                availableCommands,
                availableCommandDescriptions,
              );
              if (!isMacroCommandRecording) {
                helpCommand.execute();
              } else {
                macroCommands.push(helpCommand);
              }
            } catch (e) {
              console.log(String(e));
            }
            break;
          case AvailableCommand.BeginMacro:
            try {
              if (isMacroCommandRecording) {
                throw new Error("Macrocommand is already recording");
              }
              const parsedArgs: any[] = Parser.parseBeginMacroArgs(
                args.slice(1, args.length),
              );
              isMacroCommandRecording = true;
              newMacroCommandName = parsedArgs[0];
              newMacroCommandDescription = parsedArgs[1];
            } catch (e) {
              console.log(String(e));
            }
            break;
          case AvailableCommand.EndMacro:
            try {
              if (!isMacroCommandRecording) {
                throw new Error("Macrocommand was not recording");
              }
              const macroCommand: ICommand = new MacroCommand(macroCommands);
              availableCommands.push(newMacroCommandName);
              availableCommandDescriptions.set(
                newMacroCommandName.toLowerCase(),
                newMacroCommandDescription,
              );
              macroCommandsMap.set(
                newMacroCommandName.toLowerCase(),
                macroCommand,
              );
              isMacroCommandRecording = false;
              macroCommands = [];
              console.log(
                "Macrocommand recording has successfully stopped. New macrocommand was added to available commands",
              );
            } catch (e) {
              console.log(String(e));
            }
            break;
          case AvailableCommand.Undo:
            try {
              const undoCommand: ICommand = new UndoCommand(document);
              if (!isMacroCommandRecording) {
                undoCommand.execute();
                console.log("Undo action was successfully executed");
              } else {
                macroCommands.push(undoCommand);
              }
            } catch (e) {
              console.log(String(e));
            }
            break;
          case AvailableCommand.Redo:
            try {
              const redoCommand: ICommand = new RedoCommand(document);
              if (!isMacroCommandRecording) {
                redoCommand.execute();
                console.log("Redo action was successfully executed");
              } else {
                macroCommands.push(redoCommand);
              }
            } catch (e) {
              console.log(String(e));
            }
            break;
          case AvailableCommand.Save:
            try {
              const parsedArgs: any[] = Parser.parseSaveArgs(
                args.slice(1, args.length),
              );
              const saveCommand: ICommand = new SaveCommand(
                document,
                parsedArgs[0],
              );
              if (!isMacroCommandRecording) {
                history.addAndExecuteCommand(saveCommand);
                console.log("Saving was successfully executed");
              } else {
                macroCommands.push(saveCommand);
              }
            } catch (e) {
              console.log(String(e));
            }
            break;
          case AvailableCommand.Exit:
            resolve();
            break;
          default:
            if (macroCommandsMap.has(args[0].toLowerCase())) {
              try {
                const macroCommand: ICommand | undefined = macroCommandsMap.get(
                  args[0].toLowerCase(),
                );
                if (macroCommand) {
                  history.addAndExecuteCommand(macroCommand);
                }
                console.log(args[0] + " was successfully executed");
              } catch (e) {
                console.log(String(e));
              }
            } else {
              console.log("Unknown command. Try again");
            }
            break;
        }
      };
      this.readableStream.on("line", processClientsMessages);
      this.readableStream.on("end", () => resolve());
      this.readableStream.on("error", (e) => reject(e));
    });
  }
}

export default Client;
