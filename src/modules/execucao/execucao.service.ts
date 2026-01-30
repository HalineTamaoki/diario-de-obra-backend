import { Injectable } from '@nestjs/common';
import { UserService } from '../usuario/user.service'; // Importe o UserService
import { DataAdicionalDto } from './dto/dataAdicional';
import { ExecucaoDto, ExecucaoDtoDetalhes } from './dto/execucao';
import { ItemObraService } from '../itemObra/itemObra.service';

@Injectable()
export class ExecucaoService {
    constructor(private readonly itemObraService: ItemObraService) {} 

    async get(idItem: number, userId: number): Promise<ExecucaoDtoDetalhes> {
        const isValid = await this.itemObraService.validarItemObra(userId, idItem);
        if (!isValid) {
            throw new Error('Usuário não tem acesso a este item.');
        }
        // TODO: add no banco de dados
        return {} as ExecucaoDtoDetalhes;
    }

    async editar(idItem: number, execucao: ExecucaoDto, userId: number) {
        const isValid = await this.itemObraService.validarItemObra(userId, idItem);
        if (!isValid) {
            throw new Error('Usuário não tem acesso a este item.');
        }
        // TODO: add no banco de dados
        return;
    }

    async cadastrarDataAdicional(idItem: number, data: DataAdicionalDto, userId: number) {
        const isValid = await this.itemObraService.validarItemObra(userId, idItem);
        if (!isValid) {
            throw new Error('Usuário não tem acesso a este item.');
        }
        // TODO: add no banco de dados
        return;
    }

    async deletarDataAdicional(id: number, userId: number) {
        //TODO: obter idObra a partir do idData
        const idObra = 123;
        const isValid = await this.itemObraService.validarItemObra(userId, idObra);
        if (!isValid) {
            throw new Error('Usuário não tem acesso a este item.');
        }
        // TODO: add no banco de dados
        return;
    }
}
