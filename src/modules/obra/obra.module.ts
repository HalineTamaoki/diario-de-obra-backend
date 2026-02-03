import { Module } from '@nestjs/common';
import { ObraController } from './obra.controller';
import { ObraService } from './obra.service';
import { Obra } from './entity/obra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Obra])
  ],
  providers: [ObraService],
  controllers: [ObraController],
  exports: [ObraService],
})
export class ObraModule {}