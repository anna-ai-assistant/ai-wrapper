import {Injectable} from '@nestjs/common';
import {StoreService} from "./store/store.service";
import {MemoryService} from "./memory/memory.service";
import {AbstractAgent} from "./agent/abstract.agent";


@Injectable()
export class AiService {
  private agent: AbstractAgent;
  private store: StoreService;
  private memory: MemoryService;
  constructor() {
    this.store = new StoreService();
    this.memory = new MemoryService();
  }
}