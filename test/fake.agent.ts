import { AbstractAgent } from '../src/ai/agent/abstract.agent';
import { AgentOption } from '../src/ai/options/agent.option';
import { Inject } from '@nestjs/common';

export class FakeAgent extends AbstractAgent {
  constructor(@Inject() option: AgentOption) {
    super(
      [], option);
  }
}