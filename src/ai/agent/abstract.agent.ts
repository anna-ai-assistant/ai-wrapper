import { LLM } from "@langchain/core/language_models/llms";
import { AgentExecutorOutput } from "langchain/dist/agents/executor";
import { Tool } from "../tools/tool.interface";
import { FakeListChatModel } from "@langchain/core/utils/testing";
import { BaseChatModel } from "@langchain/core/dist/language_models/chat_models";
import { ChatOllama, Ollama } from '@langchain/ollama';
import { AgentOption } from "../options/agent.option";
import { BufferMemory } from "langchain/memory";
import { RedisChatMessageHistory } from "@langchain/redis";
import { ConversationChain } from "langchain/chains";

export abstract class AbstractAgent {
    protected readonly agent: ConversationChain;
    protected readonly chatAgent: ConversationChain;

    protected constructor(protected readonly askable: Tool[], protected readonly option: AgentOption) {
        this.agent = this.injectMemory();
        this.chatAgent = this.injectMemory('chat');
    }

    public async call(input: string, chat: boolean = false): Promise<AgentExecutorOutput>
    {
        if (chat) {
            return this.getChatAgent().call({input});
        }
        return this.getAgent().call({input});
    }

    public getAgent(): ConversationChain {
        return this.agent;
    }

    public getAgentModel(): LLM {
        return this.getModel('llm') as LLM;
    }

    public getChatAgent(): ConversationChain {
        return this.chatAgent;
    }

    public getChatAgentModel(): BaseChatModel {
        return this.getModel('chat') as BaseChatModel;
    }

    public getAskable(): Tool[] {
        return this.askable;
    }

    protected getModel(mode): LLM|BaseChatModel {
        if (this.option.ollamaConfig === undefined) {
            return new FakeListChatModel({
                responses: ["I'll callback later.", "You 'console' them!"],
            });
        }
        switch (mode) {
            default:
                return new Ollama(this.option.ollamaConfig);
            case 'chat':
                return new ChatOllama(this.option.ollamaConfig);
        }
    }

    protected injectMemory(mode: string = 'llm'): ConversationChain {
        const model: LLM|BaseChatModel = this.getModel(mode);

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

        return new ConversationChain({llm: this.injectToolInModel(model, this.getAskable()), memory });
    }

    protected injectToolInModel(model, tools: Tool[]) {
        //TODO: Find better way to type bind
        let bind = {
            tools: []
        };
        for (let tool  of tools) {
            bind.tools.push({
                type: 'function',
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