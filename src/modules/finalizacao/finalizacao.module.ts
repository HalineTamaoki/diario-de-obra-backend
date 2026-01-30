import { Module } from '@nestjs/common';
import { ItemObraService } from '../itemObra/itemObra.service';
import { FinalizacaoController } from './finalizacao.controller';
import { FinalizacaoService } from './finalizacao.service';

@Module({
  imports: [],
  providers: [FinalizacaoService, ItemObraService],
  controllers: [FinalizacaoController],
})
export class FinalizacaoModule {}
