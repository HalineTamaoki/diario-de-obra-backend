import { Injectable } from '@nestjs/common';
import { IdeiaDto } from './dto/ideacao';
import { UserService } from '../usuario/user.service'; // Importe o UserService

@Injectable()
export class IdeacaoService {
    constructor(private readonly userService: UserService) {} // Injete o UserService

    async get(idItem: number, userId: number): Promise<IdeiaDto[]> {
        const isValid = await this.userService.validarItemObra(userId, idItem);
        if (!isValid) {
            throw new Error('Usuário não tem acesso a este item.');
        }
        // TODO: add no banco de dados
        return [];
    }

    async cadastrar(idItem: number, ideia: IdeiaDto, userId: number) {
        const isValid = await this.userService.validarItemObra(userId, idItem);
        if (!isValid) {
            throw new Error('Usuário não tem acesso a este item.');
        }
        // TODO: add no banco de dados
        return;
    }

    async editar(idItem: number, ideia: IdeiaDto, userId: number) {
        const isValid = await this.userService.validarItemObra(userId, idItem);
        if (!isValid) {
            throw new Error('Usuário não tem acesso a este item.');
        }
        // TODO: add no banco de dados
        return;
    }

    async deletar(id: number, userId: number) {
        //TODO: obter idObra a partir do idIdeia
        const idObra = 123;
        const isValid = await this.userService.validarItemObra(userId, idObra);
        if (!isValid) {
            throw new Error('Usuário não tem acesso a este item.');
        }
        // TODO: add no banco de dados
        return;
    }
}
