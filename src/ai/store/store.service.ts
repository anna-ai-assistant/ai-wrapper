import {Inject, Injectable} from '@nestjs/common';
import {OllamaEmbeddings} from "@langchain/community/dist/embeddings/ollama";
import {Chroma} from "@langchain/community/vectorstores/chroma";
import {Document} from "langchain/document";
import {LangChainModuleOptions} from "../Options/langchain.option";


@Injectable()
export class StoreService
{
  private chroma: Chroma;
  async constructor(@Inject('LANGCHAIN_OPTIONS') private options: LangChainModuleOptions)
  {
    this.chroma = await Chroma.fromExistingCollection(new OllamaEmbeddings(), options.dbConfig);
  }

  async addDocuments(documents: Document[])
  {
    return this.chroma.addDocuments(documents);
  }

  async search(query: string, k: number)
  {
    return this.chroma.similaritySearch(query, k);
  }

  async getAsRetriever()
  {
    return this.chroma.asRetriever();
  }
}
