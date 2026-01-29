import { Module } from '@nestjs/common';
import { IdeacaoController } from './ideacao.controller';
import { IdeacaoService } from './ideacao.service';
import { UserService } from '../usuario/user.service';

@Module({
  imports: [],
  providers: [IdeacaoService, UserService],
  controllers: [IdeacaoController],
})
export class IdeacaoModule {}
