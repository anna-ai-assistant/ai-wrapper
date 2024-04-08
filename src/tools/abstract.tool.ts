import {Tool} from "./tool.interface";

export abstract class AbstractTool implements Tool {
  private abstract name: string;
  private abstract type: string;
  private abstract description: string;
  private abstract promptPath: string;

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