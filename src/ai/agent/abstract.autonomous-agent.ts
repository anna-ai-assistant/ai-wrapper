import {AutoGPT} from "langchain/dist/experimental/autogpt";
import {MemoryVectorStore} from "langchain/dist/vectorstores/memory";
import {SerpAPI} from "@langchain/community/dist/tools/serpapi";
import {ReadFileTool, WriteFileTool} from "langchain/tools";
import {AgentExecutorOutput} from "langchain/dist/agents/executor";
import {InMemoryFileStore} from "langchain/dist/stores/file/in_memory";
import {BabyAGI} from "langchain/dist/experimental/babyagi";

export class AbstractAutonomousAgent {
  //TODO: See if salesGPT is cool to implement ?
  //TODO: add tools and vectorstore as options
  constructor() {
  }
  public async call(goals: string[]|string): Promise<AgentExecutorOutput>
  {
    if (typeof goals === "string") {
      goals = [goals];
    }

    const store = new InMemoryFileStore();

    const tools = [
      new ReadFileTool({ store }),
      new WriteFileTool({ store }),
      new SerpAPI(process.env.SERPAPI_API_KEY, { //TODO: inject tools from options
        location: "San Francisco,California,United States",
        hl: "en",
        gl: "us",
      }),
    ];

    const vectorStore = new MemoryVectorStore(new OpenAIEmbeddings()); //TODO: inject vector store from options

    const autogpt = AutoGPT.fromLLMAndTools(
      new ChatOpenAI({ temperature: 0 }), // TODO: inject agent from options
      tools,
      {
        memory: vectorStore.asRetriever(),
        aiName: "Tom",
        aiRole: "Assistant",
      }
    );

    return autogpt.run(goals);
  }

  public call2(input: string): Promise<AgentExecutorOutput> //TODO: fusion with call and add switch for different agents
  {
    const vectorStore = new MemoryVectorStore(new OpenAIEmbeddings()); //TODO: inject vector store from options

    const babyAGI = BabyAGI.fromLLM({
      llm: new OpenAI({ temperature: 0 }), //TODO: inject agent from options
      vectorstore: vectorStore,
      maxIterations: 3,
    });

    return babyAGI.invoke({ objective: input });
  }
}