import {OllamaRequestParams} from "@langchain/community/dist/utils/ollama";

export interface AgentOption {
  connector: string;
  model: string;
  ollamaConfig: OllamaRequestParams|undefined;
  memory: string
}