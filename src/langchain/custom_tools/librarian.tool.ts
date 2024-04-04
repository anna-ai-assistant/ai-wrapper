import {Inject, Injectable} from "@nestjs/common";
import * as fs from "fs";
import * as yaml from "js-yaml";
import { Ollama } from "@langchain/community/llms/ollama";
import { JsonSpec, JsonObject } from "langchain/tools";
import { OpenApiToolkit } from "langchain/agents";
import {LangChainModuleOptions} from "../Options/langchain.option";
import {LibrarianOptions} from "../Options/librarian.option";
import { DynamicTool } from "@langchain/core/tools"
import {AbstractAsk} from "./abstract_ask.tool";


@Injectable()
export class LibrarianTool extends AbstractAsk {
  private config: LibrarianOptions;
  constructor(@Inject('LANGCHAIN_OPTIONS') private options: LangChainModuleOptions) {
    if (!options.librarianConfig) {
      throw new Error("Librarian config is required");
    }
    this.config = options.librarianConfig;
  }

  async getTools(): Promise<DynamicTool[]> {

  }

  async getMemoryFromLibrarian(search: string): Promise<JsonObject> {
      let data: JsonObject;
      try {
        const yamlFile = fs.readFileSync("openai_openapi.yaml", "utf8");
        data = yaml.load(yamlFile) as JsonObject;
        if (!data) {
          throw new Error("Failed to load OpenAPI spec");
        }
      } catch (e) {
        console.error(e);
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      };
      const model = new Ollama(
        {
        baseUrl: "http://localhost:11434", // Default value
        model: "llama2", // Default value
        }
      );
      const toolkit = new OpenApiToolkit(new JsonSpec(data), model, headers);
      const executor = new DynamicTool({
        name: "get_word_length",
        description: "Returns the length of a word.",
        func: async (input: string) => input.length.toString(),
      });

      const input = `Make a POST request to openai /completions. The prompt should be 'tell me a joke.'`;
      console.log(`Executing with input "${input}"...`);

      const result = await executor.invoke({ input });
      console.log(`Got output ${result.output}`);

      console.log(
        `Got intermediate steps ${JSON.stringify(
          result.intermediateSteps,
          null,
          2
        )}`
      );
    };
}