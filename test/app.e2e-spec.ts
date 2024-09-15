import { Test, TestingModule } from '@nestjs/testing';
import { AiModule } from '../src/ai/ai.module';
import { FakeAgent } from './fake.agent';
import { AiService } from '../src/ai/ai.service';

describe('AiModule', () => {
  it('should compile the module', async () => {
    const agentConfig = {
      connector: "fake",
      model: "fake",
      ollamaConfig: undefined,
      memory: "fake agent",
    };
    const module: TestingModule = await Test.createTestingModule(
      AiModule.forRoot(
        {
          agentConfig: agentConfig,
          agent: new FakeAgent(agentConfig),
          dbConfig: undefined,
          enableLibrarian: false,
          librarianConfig: undefined
        }
      )
    ).compile();

    expect(module).toBeDefined();
    expect(module.get(AiService)).toBeInstanceOf(AiService);
  });
});
