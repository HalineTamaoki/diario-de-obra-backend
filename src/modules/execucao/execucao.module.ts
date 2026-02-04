import { Module } from '@nestjs/common';
import { ItemObraModule } from '../itemObra/itemObra.module';
import { ExecucaoController } from './execucao.controller';
import { ExecucaoService } from './execucao.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataAdicional } from './entity/data-adicional.entity';
import { Execucao } from './entity/execucao.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([DataAdicional, Execucao]),
    ItemObraModule
  ],
  providers: [ExecucaoService],
  controllers: [ExecucaoController],
})
export class ExecucaoModule {}
