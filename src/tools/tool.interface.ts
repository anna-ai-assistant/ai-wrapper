export interface Tool {
  name: string;
  type: string;
  description: string;
  prompt: string;
  getName(): string;
  getType(): string;
  getDescription(): string;
  getPrompt(): string;
  call(...args): any;
}