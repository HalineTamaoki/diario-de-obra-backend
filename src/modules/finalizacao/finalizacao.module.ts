import { Module } from '@nestjs/common';
import { ItemObraModule } from '../itemObra/itemObra.module';
import { FinalizacaoController } from './finalizacao.controller';
import { FinalizacaoService } from './finalizacao.service';

@Module({
  imports: [ItemObraModule],
  providers: [FinalizacaoService],
  controllers: [FinalizacaoController],
})
export class FinalizacaoModule {}
