import {DynamicModule, Module} from '@nestjs/common';
import { LangChainService } from './langchain.service';
import { SearchService } from './search/search.service';
import { StoreService } from './store/store.service';
import { MemoryService } from './memory/memory.service';
import { DocumentService } from './document/document.service';
import { WebParserService } from './document/web-parser.service';
import {LangChainModuleAsyncOptions, LangChainModuleOptions} from "./langchain.option";

@Module({
  providers: [LangChainService, SearchService, StoreService, MemoryService, DocumentService, WebParserService]
})
export class LangChainModule {
  static forRoot(options: LangChainModuleOptions): DynamicModule {
    return {
      module: LangChainModule,
      providers: [
        {
          provide: 'LANGCHAIN_OPTIONS',
          useValue: options,
        },
        LangChainService,
      ],
      exports: [LangChainService],
    };
  }

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
