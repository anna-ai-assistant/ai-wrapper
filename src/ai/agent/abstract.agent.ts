import {Ollama} from "@langchain/community/dist/llms/ollama";
import {AgentExecutor, createVectorStoreAgent, VectorStoreToolkit} from "langchain/agents";
import {AgentExecutorOutput} from "langchain/dist/agents/executor";
import {Tool} from "../../tools/tool.interface";

export abstract class AbstractAgent {
    private askable: Tool[];
    private agent: AgentExecutor;

    constructor() {
    }

    public async getResponse(input: string): Promise<AgentExecutorOutput>
    {
        return this.agent.invoke({input});
    }

    public loadConfig(config: any) {

    }

    public getAskable(): Tool[] {
        return this.askable;
    }

    injectToolkit(memory) {
        const vectorStoreInfo = {
            name: "toolbelt",
            description: "documentation of all tools available as call to action",
            vectorStore: memory,
        }
        const model = new Ollama(undefined);
        const toolkit = new VectorStoreToolkit(vectorStoreInfo, model);
        this.agent = createVectorStoreAgent(model, toolkit);
    }
}