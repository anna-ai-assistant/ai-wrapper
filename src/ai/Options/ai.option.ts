import {ChromaLibArgs} from "@langchain/community/vectorstores/chroma";
import {ModuleMetadata} from "@nestjs/common";
import {LibrarianOptions} from "./librarian.option";
import {AbstractAgent} from "../agent/abstract.agent";
import {OllamaRequestParams} from "@langchain/community/dist/utils/ollama";

export interface AiModuleOptions {
  agent: AbstractAgent;
  enableLibrarian: boolean;
  librarianConfig: LibrarianOptions|undefined;
  ollamaConfig: OllamaRequestParams;
  dbConfig: ChromaLibArgs|undefined;
}

export interface AiModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<AiModuleOptions> | AiModuleOptions;
  inject?: any[];
}
