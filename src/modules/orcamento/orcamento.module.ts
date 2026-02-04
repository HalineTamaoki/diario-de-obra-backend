import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ItemObraModule } from '../itemObra/itemObra.module';
import { Orcamento } from './entity/orcamento.entity';
import { OrcamentoController } from './orcamento.controller';
import { OrcamentoService } from './orcamento.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Orcamento]),
    ItemObraModule
  ],
  providers: [OrcamentoService],
  controllers: [OrcamentoController],
})
export class OrcamentoModule {}
