import {Inject, Injectable} from "@nestjs/common";
import {LibrarianOptions} from "../../../../ai/Options/librarian.option";
import {AbstractAsk} from "../../../abstract_ask.tool";

@Injectable()
export class TellLibrarianAsk extends AbstractAsk {
  constructor(@Inject private options: LibrarianOptions) {}

  description: string;
  name: string;
  prompt: string;
  type: string;

  call(...args): any {
  }
}