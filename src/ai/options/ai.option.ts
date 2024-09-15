import {ChromaLibArgs} from "@langchain/community/vectorstores/chroma";
import {ModuleMetadata} from "@nestjs/common";
import {LibrarianOptions} from "./librarian.option";
import {AgentOption} from "./agent.option";
import {Agent} from "../agent/agent.interface";

export interface AiModuleOptions {
  agent: Agent;
  enableLibrarian: boolean;
  librarianConfig: LibrarianOptions|undefined;
  agentConfig: AgentOption;
  dbConfig: ChromaLibArgs|undefined;
}

export interface AiModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<AiModuleOptions> | AiModuleOptions;
  inject?: any[];
}
