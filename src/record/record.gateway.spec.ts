import { Test, TestingModule } from '@nestjs/testing';
import { RecordGateway } from './record.gateway';

describe('RecordGateway', () => {
  let gateway: RecordGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordGateway],
    }).compile();

    gateway = module.get<RecordGateway>(RecordGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
