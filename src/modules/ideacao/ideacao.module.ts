import { Module } from '@nestjs/common';
import { IdeacaoController } from './ideacao.controller';
import { IdeacaoService } from './ideacao.service';
import { ItemObraModule } from '../itemObra/itemObra.module';

@Module({
  imports: [ItemObraModule],
  providers: [IdeacaoService],
  controllers: [IdeacaoController],
})
export class IdeacaoModule {}
