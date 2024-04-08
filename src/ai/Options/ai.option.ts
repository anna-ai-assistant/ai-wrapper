import {ChromaLibArgs} from "@langchain/community/vectorstores/chroma";
import {ModuleMetadata} from "@nestjs/common";
import {LibrarianOptions} from "./librarian.option";
import {AbstractAgent} from "../agent/abstract.agent";

export interface AiModuleOptions {
  agent: AbstractAgent;
  enableLibrarian: boolean;
  librarianConfig: LibrarianOptions|undefined;
  dbConfig: ChromaLibArgs|undefined;
}

export interface AiModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<AiModuleOptions> | AiModuleOptions;
  inject?: any[];
}
