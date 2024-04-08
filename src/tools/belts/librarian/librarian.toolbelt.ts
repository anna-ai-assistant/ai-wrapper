import { Injectable } from "@nestjs/common";
import { LibrarianOptions } from "../../../ai/Options/librarian.option";
import { Toolbelt } from "../toolbelt";
import { AbstractTool } from "../../abstract.tool";
import { SearchLibrarianAsk } from "./ask/search_librarian.ask";
import { TellLibrarianAsk } from "./ask/tell_librarian.ask";



@Injectable()
export class LibrarianToolbelt implements Toolbelt {
  static getName(): string {
    return 'librarian';
  }

  async getTools(options: LibrarianOptions): Promise<any[]> {
    return [
      SearchLibrarianAsk,
      TellLibrarianAsk
    ];
  }
}