import {ChromaLibArgs} from "@langchain/community/vectorstores/chroma";
import {ModuleMetadata} from "@nestjs/common";
import {LibrarianOptions} from "./librarian.option";
import {AbstractAgent} from "../agent/abstract.agent";
import {AgentOption} from "./agent.option";

export interface AiModuleOptions {
  agent: AbstractAgent;
  enableLibrarian: boolean;
  librarianConfig: LibrarianOptions|undefined;
  agentConfig: AgentOption;
  dbConfig: ChromaLibArgs|undefined;
}

export interface AiModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<AiModuleOptions> | AiModuleOptions;
  inject?: any[];
}
