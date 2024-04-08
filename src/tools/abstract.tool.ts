import {Tool} from "./tool.interface";

export abstract class AbstractTool implements Tool {
  abstract name: string;
  abstract type: string;
  abstract description: string;
  abstract promptPath: string;

  getName(): string {
    return this.name
  }
  getType(): string {
    return this.type
  }
  getDescription(): string {
    return this.description
  }
  getPromptPath(): string {
    return this.promptPath
  }

  abstract call(...args): any;

}