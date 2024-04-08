import { DynamicTool, DynamicStructuredTool } from "@langchain/core/tools";
import {AbstractTool} from "../../tools/abstract.tool";

export abstract class AbstractAgent {
    protected askable: string[];

    constructor() {
    }

    public getAskableService() : string[] {
        return this.askable;
    }

    public injectTools(tools: AbstractTool[]) {
        return;
    }
}