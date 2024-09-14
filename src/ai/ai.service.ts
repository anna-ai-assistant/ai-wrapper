import { Inject, Injectable } from '@nestjs/common';
// import {StoreService} from "./store/store.service";
// import {MemoryService} from "./memory/memory.service";
import {AbstractAgent} from "./agent/abstract.agent";
import { AutonomousAgent } from './agent/autonomous.agent';


@Injectable()
export class AiService {
  // private store: StoreService;
  // private memory: MemoryService;
  constructor(@Inject private agent: AbstractAgent, @Inject private autonomousAgent: AutonomousAgent) {
    // this.store = new StoreService();
    // this.memory = new MemoryService();
  }

  public async call(input: string, chat: boolean = false): Promise<any> {
    return this.agent.call(input, chat);
  }

  public async callAutoGpt(goals: string[] | string): Promise<any> {
    return this.autonomousAgent.callAutoGpt(goals);
  }

  public async callBabyAgi(input: string): Promise<any> {
    return this.autonomousAgent.callBabyAgi(input);
  }
}