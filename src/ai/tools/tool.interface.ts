export interface Tool {
  name: string;
  type: string;
  description: string;
  parameters: any;
  getName(): string;
  getType(): string;
  getDescription(): string;
  getPromptPath(): string;
  call(object): object;
}