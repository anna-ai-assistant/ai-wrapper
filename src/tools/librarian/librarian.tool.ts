import {Inject, Injectable} from "@nestjs/common";
import {LibrarianOptions} from "../../ai/options/librarian.option";
import {AbstractTool} from "../abstract.tool";

@Injectable()
export class LibrarianTool extends AbstractTool {
  private description: string = "";
  private name: string = 'librarian';
  private promptPath: string = ""; //Todo: Implement promptPath
  private type: string = 'information source, ask, agent';

  private options: LibrarianOptions;

  constructor(@Inject private options: LibrarianOptions) {

  }

  async call(...options): Promise<any>
  {
    //Todo: Implement correct type for options
    switch (options['method']) {
      case 'search':
        return this.search(...options);
      case 'tell':
        return this.tell(...options);
    }
  }

  async search(...options): Promise<any>
  {
    //Todo: Implement this method
  }

  async tell(...options): Promise<any>
  {
    //Todo: Implement this method
  }
}