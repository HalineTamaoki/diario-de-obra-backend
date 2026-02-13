import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { UsuarioDto } from '../../dto/usuario';
import { AuthService } from './auth.service';
import { fieldExceptionFactory } from '../../utils/utils';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body(new ValidationPipe({groups: ['default'], exceptionFactory: fieldExceptionFactory })) usuario: UsuarioDto) {
      return this.authService.login(usuario);
    }
}