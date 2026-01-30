import { Module } from '@nestjs/common';
import { ItemObraService } from '../itemObra/itemObra.service';
import { IdeacaoController } from './ideacao.controller';
import { IdeacaoService } from './ideacao.service';

@Module({
  imports: [],
  providers: [IdeacaoService, ItemObraService],
  controllers: [IdeacaoController],
})
export class IdeacaoModule {}
