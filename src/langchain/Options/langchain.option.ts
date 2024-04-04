// src/langchain/langchain.options.ts

import {ChromaLibArgs} from "@langchain/community/vectorstores/chroma";
import {ModuleMetadata} from "@nestjs/common";
import {LibrarianOptions} from "./librarian.option";

export interface LangChainModuleOptions {
  enableLibrarian: boolean;
  librarianConfig: LibrarianOptions|undefined;
  dbConfig: ChromaLibArgs|undefined;
  // Ajoutez d'autres options de configuration ici
}

export interface LangChainModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<LangChainModuleOptions> | LangChainModuleOptions;
  inject?: any[];
}
