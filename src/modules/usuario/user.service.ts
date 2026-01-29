import { Injectable } from '@nestjs/common';
import { Usuario } from '../../dto/usuario';

@Injectable()
export class UserService {
  async cadastrar(user: Usuario) {
    // TODO: add no banco de dados
    return;
  }

  async validarItemObra(idUsuario: number, idItemObra: number): Promise<boolean> {
    //TODO: consultar se o itemObra pertence ao usuario
    return true;
  }  
}
