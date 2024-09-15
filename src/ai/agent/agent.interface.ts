import { AgentExecutorOutput } from "langchain/dist/agents/executor";
import { ConversationChain } from "langchain/chains";
import { LLM } from "@langchain/core/language_models/llms";
import { BaseChatModel } from "@langchain/core/dist/language_models/chat_models";
import { Tool } from "../tools/tool.interface";

export interface Agent {
    call(input: string, chat: boolean): Promise<AgentExecutorOutput>;
    getAgent(): ConversationChain;
    getAgentModel(): LLM;
    getChatAgent(): ConversationChain;
    getChatAgentModel(): BaseChatModel;
    getAskable(): Tool[];
}