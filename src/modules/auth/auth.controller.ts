import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { Usuario } from '../../dto/usuario';
import { AuthService } from './auth.service';
import { fieldExceptionFactory } from 'src/utils/utils';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body(new ValidationPipe({groups: ['default'], exceptionFactory: fieldExceptionFactory })) usuario: Usuario) {
      return this.authService.login(usuario);
    }
}