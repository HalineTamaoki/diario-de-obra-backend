import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from './types/Usuario';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: Usuario) {
    //TODO: trocar sub pelo id do usuário no banco de dados
    const payload = { username: user.usuario, sub: 123 };

    // TODO: validate user against a database
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
