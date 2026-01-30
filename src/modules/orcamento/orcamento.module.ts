import { Module } from '@nestjs/common';
import { ItemObraService } from '../itemObra/itemObra.service';
import { OrcamentoController } from './orcamento.controller';
import { OrcamentoService } from './orcamento.service';

@Module({
  imports: [],
  providers: [OrcamentoService, ItemObraService],
  controllers: [OrcamentoController],
})
export class OrcamentoModule {}
