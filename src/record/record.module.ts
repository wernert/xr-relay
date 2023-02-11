import { Module } from '@nestjs/common';
import { RecordGateway } from './record.gateway';

@Module({
  providers: [RecordGateway]
})
export class RecordModule {}
