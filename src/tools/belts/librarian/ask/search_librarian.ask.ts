import {AbstractAsk} from "../../../abstract_ask.tool";
import {Inject, Injectable} from "@nestjs/common";
import {LibrarianOptions} from "../../../../ai/Options/librarian.option";

@Injectable()
export class SearchLibrarianAsk extends AbstractAsk
{
  constructor(@Inject('LIBRARIAN_OPTION') private options: LibrarianOptions) {}

  description: 'used to search for informations in librarian';
  name: 'librarians.search';
  prompt: string;
  type: 'information source';

  call(search: string, user: any): any {
    // TODO: Implement this method
  }
}