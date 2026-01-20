import { Injectable } from '@nestjs/common';
import { Usuario } from '../../dto/usuario';

@Injectable()
export class UserService {
  async cadastrar(user: Usuario) {
    // TODO: add no banco de dados
    return;
  }
}
