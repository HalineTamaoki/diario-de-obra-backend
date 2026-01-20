import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/usuario/user.module';
import { ObraModule } from './modules/obra/obra.module';

@Module({
  imports: [AuthModule, UserModule, ObraModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
