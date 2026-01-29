import { Module } from '@nestjs/common';
import { UserService } from '../usuario/user.service';
import { OrcamentoController } from './orcamento.controller';
import { OrcamentoService } from './orcamento.service';

@Module({
  imports: [],
  providers: [OrcamentoService, UserService],
  controllers: [OrcamentoController],
})
export class OrcamentoModule {}
