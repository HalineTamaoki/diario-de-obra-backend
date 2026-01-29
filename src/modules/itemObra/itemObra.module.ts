import { Module } from '@nestjs/common';
import { ItemObraController } from './itemObra.controller';
import { ItemObraService } from './itemObra.service';

@Module({
  imports: [],
  providers: [ItemObraService],
  controllers: [ItemObraController],
})
export class ItemObraModule {}