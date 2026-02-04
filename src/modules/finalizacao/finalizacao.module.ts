import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Finalizacao } from './entity/finalizacao.entity';
import { FinalizacaoController } from './finalizacao.controller';
import { FinalizacaoService } from './finalizacao.service';
import { ItemObraModule } from '../itemObra/itemObra.module';

@Module({
  imports: [
    AuthModule,
    ItemObraModule,
    TypeOrmModule.forFeature([Finalizacao])
  ],
  providers: [FinalizacaoService],
  controllers: [FinalizacaoController],
})
export class FinalizacaoModule {}
