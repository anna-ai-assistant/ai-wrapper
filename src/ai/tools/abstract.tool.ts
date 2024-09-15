import {Tool} from "./tool.interface";

export abstract class AbstractTool implements Tool {
  protected abstract name: string;
  protected abstract type: string;
  protected abstract description: string;
  protected abstract promptPath: string;
  protected abstract parameters: any;

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