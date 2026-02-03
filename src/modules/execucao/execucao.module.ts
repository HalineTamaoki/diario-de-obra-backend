import { Module } from '@nestjs/common';
import { ItemObraModule } from '../itemObra/itemObra.module';
import { ExecucaoController } from './execucao.controller';
import { ExecucaoService } from './execucao.service';

@Module({
  imports: [ItemObraModule],
  providers: [ExecucaoService],
  controllers: [ExecucaoController],
})
export class ExecucaoModule {}
