import { Injectable } from '@nestjs/common';
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {StoreService} from "./store/store.service";
import {MemoryService} from "./memory/memory.service";

@Injectable()
export class LangChainService {
  private store: StoreService;
  private memory: MemoryService;
  constructor() {
    this.store = new StoreService();
    this.memory = new MemoryService();
  }
}