import {AbstractTool} from "../abstract.tool";

export interface Toolbelt {
  getName(): string;
  getTools(...args): any[];
}