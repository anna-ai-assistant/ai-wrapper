import {Injectable} from '@nestjs/common';
import {MongoClient, ObjectId} from "mongodb";
import {BufferMemory} from "langchain/memory";
import {MongoDBChatMessageHistory} from "@langchain/community/stores/message/mongodb";

@Injectable()
export class MemoryService {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient("mongodb://localhost:27017"); //Todo migrate to module service injection
  }

  async getMemory(sessionId:null|string):Promise<BufferMemory> {
    return new BufferMemory({
      chatHistory: new MongoDBChatMessageHistory(
        {
          collection: this.client.db("librarian").collection("chat"), //Todo need to be configurable
          sessionId: sessionId ?? new ObjectId().toString()
        }
      ),
    });
  }
}
