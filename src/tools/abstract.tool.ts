import {Tool} from "./tool.interface";

export abstract class AbstractTool implements Tool {
  abstract name: string;
  abstract type: string;
  abstract description: string;
  abstract prompt: string;

  getName(): string {
    return this.name
  }
  getType(): string {
    return this.type
  }
  getDescription(): string {
    return this.description
  }
  getPrompt(): string {
    return this.prompt
  }

  abstract call(...args): any;

}