import { Module } from '@nestjs/common';
import { UserService } from '../usuario/user.service';
import { FinalizacaoController } from './finalizacao.controller';
import { FinalizacaoService } from './finalizacao.service';

@Module({
  imports: [],
  providers: [FinalizacaoService, UserService],
  controllers: [FinalizacaoController],
})
export class FinalizacaoModule {}
