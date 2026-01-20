import { Module } from '@nestjs/common';
import { ObraController } from './obra.controller';
import { ObraService } from './obra.service';

@Module({
  imports: [],
  providers: [ObraService],
  controllers: [ObraController],
})
export class ObraModule {}