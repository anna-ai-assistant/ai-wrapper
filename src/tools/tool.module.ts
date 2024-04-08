import {DynamicModule, Module} from '@nestjs/common';
import {Tool} from "./tool.interface";
import {Toolbelt} from "./belts/toolbelt";
import {AiModuleOptions} from "../ai/Options/ai.option";
import {LibrarianToolbelt} from "./belts/librarian/librarian.toolbelt";

@Module({})
export class ToolModule {

  static forRoot(options: AiModuleOptions): DynamicModule {
    let agent = options.agent;
    let tools = this.loadTools(options);


    return {
      module: ToolModule,
      providers: [
        {
          provide: 'TOOLS',
          useValue: tools,
        }
        {


      ],
      exports: ['TOOLS'],
    }
  }

  private static loadTools(options: LangChainModuleOptions): Tool[] {
    let tools: Tool[] = [];
    // foreach belts for loading tools
    let belts = this.loadBelts(options);
    belts.forEach(belt => {
      tools.push(...belt.getTools());
    });
    return tools;
  }

  private static loadBelts(options: LangChainModuleOptions): Toolbelt[] {
    let askableServices = options.agent.getAskableService();
    let loadedbelts: Toolbelt[] = [];
    let belts: Toolbelt[] =
      [
        LibrarianToolbelt,

      ];
    belts.forEach(belt => {
      if (askableServices.includes(belt.getName())) {
        loadedbelts.push(belt);
      }
    })
    return loadedbelts;
  }
}