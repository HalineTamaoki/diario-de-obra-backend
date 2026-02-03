import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UsuarioDto } from '../../dto/usuario';
import { Usuario } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Usuario) private userRepository: Repository<Usuario>,
  ) {}

  async cadastrar(user: UsuarioDto) {
    const exists = await this.userRepository.exists({ where: { email: user.email } });
    if (exists) {
      throw new BadRequestException('Usuário com este email já existe.');
    }
    const hashedPassword = await bcrypt.hash(user.senha, 10);

    const newUser = this.userRepository.create({ ...user, senha: hashedPassword });
    const savedUser = await this.userRepository.save(newUser);

    return { id: savedUser.id, email: savedUser.email };
  }

  async validarUsuario(user: UsuarioDto): Promise<number> {
    const dbUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (!dbUser) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const isPasswordValid = await bcrypt.compare(user.senha, dbUser.senha);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return dbUser.id;
  }
}
