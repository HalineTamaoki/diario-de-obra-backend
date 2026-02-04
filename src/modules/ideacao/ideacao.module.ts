import { Module } from '@nestjs/common';
import { IdeacaoController } from './ideacao.controller';
import { IdeacaoService } from './ideacao.service';
import { ItemObraModule } from '../itemObra/itemObra.module';
import { AuthModule } from '../auth/auth.module';
import { Ideia } from './entity/ideia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule, 
    TypeOrmModule.forFeature([Ideia]),
    ItemObraModule
  ],
  providers: [IdeacaoService],
  controllers: [IdeacaoController],
})
export class IdeacaoModule {}
