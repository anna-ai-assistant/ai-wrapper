import {Inject, Injectable} from "@nestjs/common";
import {LibrarianOptions} from "../../options/librarian.option";
import {AbstractTool} from "../abstract.tool";

@Injectable()
export class LibrarianTool extends AbstractTool {
  protected description: string = "";
  protected name: string = 'librarian';
  protected promptPath: string = ""; //Todo: Implement promptPath
  protected type: string = 'information source, ask, agent';
  protected parameters: any;

  constructor(@Inject() protected options: LibrarianOptions) {
    super();

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