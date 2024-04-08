import {AbstractTool} from "./abstract.tool";
import {MemoryVectorStore} from "langchain/dist/vectorstores/memory";
import {OllamaEmbeddings} from "@langchain/community/dist/embeddings/ollama";
import {Tool} from "./tool.interface";
import {TextLoader} from "langchain/dist/document_loaders/fs/text";
import {AbstractAgent} from "../ai/agent/abstract.agent";
import {Inject} from "@nestjs/common";
import {Document} from "langchain/document";

export class Toolbelt {
  private memory: MemoryVectorStore
  private agent: AbstractAgent;

  constructor(@Inject private agent: AbstractAgent) {
    this.agent.injectToolkit(
      this.loadMemory(
        agent.getAskable()
      )
    );
  }

  async getTool(name: string): Promise<AbstractTool> {

  }

  async loadMemory(tools: Tool[]): Promise<any> {
    return MemoryVectorStore.fromDocuments(
      await this.loadToolsPrompt(tools),
      new OllamaEmbeddings()
    );
  }

  async loadToolsPrompt(tools: Tool[]) {
    let documents: Document[] = [];

    for (const tool: Tool  of tools) {
      let loader: TextLoader = new TextLoader(tool.promptPath);
      documents = [...documents, ...await loader.load()];
    }

    return documents;
  }
}