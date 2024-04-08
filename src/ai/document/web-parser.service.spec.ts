import { Test, TestingModule } from '@nestjs/testing';
import { WebParserService } from './web-parser.service';

describe('WebParserService', () => {
  let service: WebParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebParserService],
    }).compile();

    service = module.get<WebParserService>(WebParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
