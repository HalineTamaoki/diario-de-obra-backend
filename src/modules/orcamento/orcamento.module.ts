import { Module } from '@nestjs/common';
import { ItemObraModule } from '../itemObra/itemObra.module';
import { OrcamentoController } from './orcamento.controller';
import { OrcamentoService } from './orcamento.service';

@Module({
  imports: [ItemObraModule],
  providers: [OrcamentoService],
  controllers: [OrcamentoController],
})
export class OrcamentoModule {}
