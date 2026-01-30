import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioDto } from '../../dto/usuario';
import { UserService } from '../usuario/user.service';

@Injectable()
export class AuthService {
  constructor(  
    private readonly jwtService: JwtService, 
    private readonly userService: UserService
  ) {}

  async login(user: UsuarioDto) {
    const idUsuario = await this.userService.validarUsuario(user);
    const payload = { username: user.email, id: idUsuario };
    const expiresIn = '1h'; 

    const accessToken = this.jwtService.sign(payload, { expiresIn });
    const decoded: any = this.jwtService.decode(accessToken);

    return {
      access_token: accessToken,
      validTo: decoded.exp ? new Date(decoded.exp * 1000).toISOString() : null,
    };
  }
}
