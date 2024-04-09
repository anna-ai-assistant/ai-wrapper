import {DynamicModule, Module} from '@nestjs/common';
import {AiService} from './ai.service';
import {SearchService} from './search/search.service';
import {StoreService} from './store/store.service';
import {MemoryService} from './memory/memory.service';
import {DocumentService} from './document/document.service';
import {WebParserService} from './document/web-parser.service';
import {AiModuleAsyncOptions, AiModuleOptions} from "./options/ai.option";
import {AbstractAgent} from "./agent/abstract.agent";
import {ToolModule} from "../tools/tool.module";

@Module({})
export class AiModule {
  static forRoot(options: AiModuleOptions): DynamicModule {
    return {
      module: AiModule,
      imports: [ToolModule.forRoot(options)],
      providers: [
        {
          provide: AbstractAgent,
          useValue: options.agent,
        },
        SearchService,
        StoreService,
        MemoryService,
        DocumentService,
        WebParserService,
        AiService
      ],
      exports: [AiService],
    };
  }

  // TODO: Implement forRootAsync sync with forRoot()
  static forRootAsync(options: AiModuleAsyncOptions): DynamicModule {
    return {
      module: AiModule,
      imports: options.imports || [],
      providers: [
        {
          provide: 'AI_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        AiService,
      ],
      exports: [AiService],
    };
  }
}
