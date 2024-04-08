import {DynamicModule, Module} from '@nestjs/common';
import {Tool} from "./tool.interface";
import {Toolbelt} from "./toolbelt";
import {AiModuleOptions} from "../ai/Options/ai.option";
import {LibrarianTool} from "./librarian/librarian.tool";

@Module({})
export class ToolModule {

  static forRoot(options: AiModuleOptions): DynamicModule {
    let agent = options.agent;
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