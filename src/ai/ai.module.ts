import {DynamicModule, Module} from '@nestjs/common';
import {AiService} from './ai.service';
import {AiModuleAsyncOptions, AiModuleOptions} from "./options/ai.option";
import { AutonomousAgent } from './agent/autonomous.agent';
import { Agent } from './agent/agent.interface';

@Module({})
export class AiModule {
  static forRoot(options: AiModuleOptions): DynamicModule {
    return {
      module: AiModule,
      imports: [],
      providers: [
        {
          provide: 'Agent',
          useValue: options.agent,
        },
        AutonomousAgent,
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
