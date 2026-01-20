import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../../dto/usuario';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: Usuario) {
    //TODO: trocar sub pelo id do usuário no banco de dados
    const payload = { username: user.email, sub: 123 };
    const expiresIn = '1h'; 

    const accessToken = this.jwtService.sign(payload, { expiresIn });
    const decoded: any = this.jwtService.decode(accessToken);

    // TODO: validate user against a database
    return {
      access_token: accessToken,
      validTo: decoded.exp ? new Date(decoded.exp * 1000).toISOString() : null,
    };
  }
}
