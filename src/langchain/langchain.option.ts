// src/langchain/langchain.options.ts

import {ChromaLibArgs} from "@langchain/community/vectorstores/chroma";
import {ModuleMetadata} from "@nestjs/common";

export interface LangChainModuleOptions {
  dbConfig: ChromaLibArgs
  apiKey: string;
  // Ajoutez d'autres options de configuration ici
}

export interface LangChainModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<LangChainModuleOptions> | LangChainModuleOptions;
  inject?: any[];
}
