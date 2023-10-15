/* eslint-disable @typescript-eslint/no-explicit-any */
class Parser {
  static parseInsertParagraphArgs(
    args: string[],
    documentItemsCount: number,
  ): any[] {
    const parsedArgs: any[] = [];

    if (args.length < 2) {
      throw new Error("Incorrect arguments count. Arguments count should be 2");
    }
    if (args[0].toLowerCase() !== "end" && isNaN(Number(args[0]))) {
      throw new Error("First argument should be either end, either number");
    }
    if (args[0].toLowerCase() === "end") {
      parsedArgs.push(documentItemsCount);
    } else if (!isNaN(Number(args[0]))) {
      parsedArgs.push(Number(args[0]));
    }
    let text: string = "";
    for (let i = 1; i < args.length; i++) {
      text += args[i];
      if (i != args.length - 1) {
        text += " ";
      }
    }
    parsedArgs.push(text);

    return parsedArgs;
  }

  static parseInsertImageArgs(
    args: string[],
    documentItemsCount: number,
  ): any[] {
    const parsedArgs: any[] = [];

    if (args.length < 4) {
      throw new Error("Incorrect arguments count. Arguments count should be 4");
    }
    if (args[0].toLowerCase() !== "end" && isNaN(Number(args[0]))) {
      throw new Error("First argument should be either end, either number");
    }
    if (args[0].toLowerCase() === "end") {
      parsedArgs.push(documentItemsCount);
    } else if (!isNaN(Number(args[0]))) {
      parsedArgs.push(Number(args[0]));
    }
    if (isNaN(Number(args[1]))) {
      throw new Error("Second argument should be number");
    }
    parsedArgs.push(Number(args[1]));
    if (isNaN(Number(args[2]))) {
      throw new Error("Third argument should be number");
    }
    parsedArgs.push(Number(args[2]));
    let path: string = "";
    for (let i = 3; i < args.length; i++) {
      path += args[i];
      if (i != args.length - 1) {
        path += " ";
      }
    }
    parsedArgs.push(path);

    return parsedArgs;
  }

  static parseSaveArgs(args: string[]): any[] {
    const parsedArgs: any[] = [];

    if (args.length < 1) {
      throw new Error("Incorrect arguments count. Arguments count should be 1");
    }
    let path: string = "";
    for (let i = 0; i < args.length; i++) {
      path += args[i];
      if (i != args.length - 1) {
        path += " ";
      }
    }
    parsedArgs.push(path);

    return parsedArgs;
  }

  static parseReplaceTextArgs(
    args: string[],
    documentItemsCount: number,
  ): any[] {
    const parsedArgs: any[] = [];

    if (args.length < 2) {
      throw new Error("Incorrect arguments count. Arguments count should be 2");
    }
    if (args[0].toLowerCase() !== "end" && isNaN(Number(args[0]))) {
      throw new Error("First argument should be either end, either number");
    }
    if (args[0].toLowerCase() === "end") {
      parsedArgs.push(documentItemsCount);
    } else if (!isNaN(Number(args[0]))) {
      parsedArgs.push(Number(args[0]));
    }
    let text: string = "";
    for (let i = 1; i < args.length; i++) {
      text += args[i];
      if (i != args.length - 1) {
        text += " ";
      }
    }
    parsedArgs.push(text);

    return parsedArgs;
  }

  static parseResizeImageArgs(
    args: string[],
    documentItemsCount: number,
  ): any[] {
    const parsedArgs: any[] = [];

    if (args.length < 3) {
      throw new Error("Incorrect arguments count. Arguments count should be 3");
    }
    if (args[0].toLowerCase() !== "end" && isNaN(Number(args[0]))) {
      throw new Error("First argument should be either end, either number");
    }
    if (args[0].toLowerCase() === "end") {
      parsedArgs.push(documentItemsCount);
    } else if (!isNaN(Number(args[0]))) {
      parsedArgs.push(Number(args[0]));
    }
    if (isNaN(Number(args[1]))) {
      throw new Error("Second argument should be number");
    }
    parsedArgs.push(Number(args[1]));
    if (isNaN(Number(args[2]))) {
      throw new Error("Third argument should be number");
    }
    parsedArgs.push(Number(args[2]));

    return parsedArgs;
  }

  static parseDeleteItemArgs(
    args: string[],
    documentItemsCount: number,
  ): any[] {
    const parsedArgs: any[] = [];

    if (args.length !== 1) {
      throw new Error("Incorrect arguments count. Arguments count should be 1");
    }
    if (args[0].toLowerCase() !== "end" && isNaN(Number(args[0]))) {
      throw new Error("First argument should be either end, either number");
    }
    if (args[0].toLowerCase() === "end") {
      parsedArgs.push(documentItemsCount);
    } else if (!isNaN(Number(args[0]))) {
      parsedArgs.push(Number(args[0]));
    }

    return parsedArgs;
  }

  static parseSetTitleArgs(args: string[]): any[] {
    const parsedArgs: any[] = [];

    if (args.length < 1) {
      throw new Error("Incorrect arguments count. Arguments count should be 1");
    }
    let title: string = "";
    for (let i = 0; i < args.length; i++) {
      title += args[i];
      if (i != args.length - 1) {
        title += " ";
      }
    }
    parsedArgs.push(title);

    return parsedArgs;
  }

  static parseBeginMacroArgs(args: string[]): any[] {
    const parsedArgs: any[] = [];

    if (args.length < 2) {
      throw new Error("Incorrect arguments count. Arguments count should be 1");
    }
    parsedArgs.push(args[0]);
    let description: string = "";
    for (let i = 1; i < args.length; i++) {
      description += args[i];
      if (i != args.length - 1) {
        description += " ";
      }
    }
    parsedArgs.push(description);

    return parsedArgs;
  }
}

export default Parser;
