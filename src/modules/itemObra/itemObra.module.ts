import { Module } from '@nestjs/common';
import { ItemObraController } from './itemObra.controller';
import { ItemObraService } from './itemObra.service';
import { ItemObra } from './entity/itemObra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ObraModule } from '../obra/obra.module';

@Module({
  imports: [
    AuthModule,
    ObraModule,
    TypeOrmModule.forFeature([ItemObra])
  ],
  providers: [ItemObraService],
  controllers: [ItemObraController],
  exports: [ItemObraService],
})
export class ItemObraModule {}