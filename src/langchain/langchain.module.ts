import {DynamicModule, Module} from '@nestjs/common';
import { LangChainService } from './langchain.service';
import { SearchService } from './search/search.service';
import { StoreService } from './store/store.service';
import { MemoryService } from './memory/memory.service';
import { DocumentService } from './document/document.service';
import { WebParserService } from './document/web-parser.service';
import {LangChainModuleAsyncOptions, LangChainModuleOptions} from "./Options/langchain.option";
import {LibrarianTool} from "./custom_tools/librarian.tool";
import {AbstractAgent} from "./agent/abstract.agent";

@Module({})
export class LangChainModule {
  static forRoot(agent: AbstractAgent, options: LangChainModuleOptions): DynamicModule {
    return {
      module: LangChainModule,
      providers: [
        {
          provide: 'LANGCHAIN_OPTIONS',
          useValue: options,
        },
        SearchService,
        StoreService,
        MemoryService,
        DocumentService,
        WebParserService,
        // Conditionnellement ajouter Librarian aux providers
        ...(options.enableLibrarian ? [{ provide: LibrarianTool, useClass: LibrarianTool }] : []),
        LangChainService
      ],
      exports: [LangChainService],
    };
  }

  // TODO: Implement forRootAsync sync with forRoot()
  static forRootAsync(options: LangChainModuleAsyncOptions): DynamicModule {
    return {
      module: LangChainModule,
      imports: options.imports || [],
      providers: [
        {
          provide: 'LANGCHAIN_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        LangChainService,
      ],
      exports: [LangChainService],
    };
  }
}
