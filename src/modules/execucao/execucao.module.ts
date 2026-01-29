import { Module } from '@nestjs/common';
import { UserService } from '../usuario/user.service';
import { ExecucaoController } from './execucao.controller';
import { ExecucaoService } from './execucao.service';

@Module({
  imports: [],
  providers: [ExecucaoService, UserService],
  controllers: [ExecucaoController],
})
export class ExecucaoModule {}
