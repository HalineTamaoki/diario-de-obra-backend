import { Module } from '@nestjs/common';
import { ItemObraService } from '../itemObra/itemObra.service';
import { ExecucaoController } from './execucao.controller';
import { ExecucaoService } from './execucao.service';

@Module({
  imports: [],
  providers: [ExecucaoService, ItemObraService],
  controllers: [ExecucaoController],
})
export class ExecucaoModule {}
