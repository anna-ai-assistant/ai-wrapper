
import { LLM } from "@langchain/core/language_models/llms";
import {AgentExecutorOutput} from "langchain/dist/agents/executor";
import {Tool} from "../../tools/tool.interface";
import { FakeListChatModel } from "@langchain/core/utils/testing";
import { BaseChatModel } from "@langchain/core/dist/language_models/chat_models";
import { ChatOllama, Ollama } from '@langchain/ollama';
import {AgentOption} from "../options/agent.option";
import {BufferMemory} from "langchain/memory";
import {RedisChatMessageHistory} from "@langchain/redis";
import {ConversationChain} from "langchain/chains";

export abstract class AbstractAgent {
    private askable: Tool[];
    private agent: ConversationChain;
    private option: AgentOption;

    async constructor() {
        this.agent = await this.injectMemory();
    }

    public async call(input: string): Promise<AgentExecutorOutput>
    {
        return this.agent.call({input});
    }

    public getAskable(): Tool[] {
        return this.askable;
    }

    private getModel(): LLM|BaseChatModel {
        if (this.option.ollamaConfig === undefined) {
            return new FakeListChatModel({
                responses: ["I'll callback later.", "You 'console' them!"],
            });
        }
        switch (this.option.connector) {
            case "ollama":
                return new Ollama(this.option.ollamaConfig);
            default:
                return new ChatOllama(this.option.ollamaConfig);
        }
    }

    private async injectMemory() {
        const memory = new BufferMemory({
            //TODO: Find better way to use redis memory
            chatHistory: new RedisChatMessageHistory({
                sessionId: new Date().toISOString(), //TODO: Find better way to generate session id
                sessionTTL: 300, // 5 minutes, omit this parameter to make sessions never expire
                config: {
                    url: this.option.memory
                }
            }),
        });

        return new ConversationChain({llm: await this.injectToolInModel(this.getAskable()), memory });
    }

    private async injectToolInModel(tools: Tool[]) {
        const model: LLM|BaseChatModel = this.getModel();
        //TODO: Find better way to type bind
        let bind = {
            tools: []
        };
        for (let tool  of tools) {
            bind.tools.push({
                type: "function" as const,
                function: {
                    name: tool.name,
                    description: tool.description,
                    parameters: tool.parameters,
                }
            });
        }
        return model.bind(bind);

    }
}