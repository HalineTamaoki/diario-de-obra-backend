import { Injectable } from '@nestjs/common';
import { Selecionar } from 'src/dto/selecionar';
import { ItemObraService } from '../itemObra/itemObra.service';
import { OrcamentoDetalhes, OrcamentoResumo } from './dto/orcamento';

@Injectable()
export class OrcamentoService {
    constructor(private readonly itemObraService: ItemObraService) {} 

    async validarOrcamento(idOrcamento: number, userId: number): Promise<boolean> {
        // TODO: obter idObra a partir do idOrcamento
        const idObra = 123; 
        const isValid = await this.itemObraService.validarItemObra(userId, idObra);
        return isValid;
    }

    async get(idItem: number, userId: number): Promise<OrcamentoResumo[]> {
        const isValid = await this.itemObraService.validarItemObra(userId, idItem);
        if (!isValid) {
            throw new Error('Usuário não tem acesso a este item.');
        }
        // TODO: add no banco de dados
        return [];
    }

    async getDetalhes(idOrcamento: number, userId: number): Promise<OrcamentoDetalhes> {
        const isValid = await this.validarOrcamento(idOrcamento, userId);
        if (!isValid) {
            throw new Error('Usuário não tem acesso a este item.');
        }
        // TODO: add no banco de dados
        return {} as OrcamentoDetalhes;
    }

    async cadastrar(idItem: number, orcamento: OrcamentoDetalhes, userId: number) {
        const isValid = await this.itemObraService.validarItemObra(userId, idItem);
        if (!isValid) {
            throw new Error('Usuário não tem acesso a este item.');
        }
        // TODO: add no banco de dados
        return;
    }

    async editar(idItem: number, orcamento: OrcamentoDetalhes, userId: number) {
        const isValid = await this.itemObraService.validarItemObra(userId, idItem);
        if (!isValid) {
            throw new Error('Usuário não tem acesso a este item.');
        }
        // TODO: add no banco de dados
        return;
    }

    async selecionar(idOrcamento: number, selecionado: Selecionar, userId: number) {
        const isValid = await this.validarOrcamento(idOrcamento, userId);
        if (!isValid) {
            throw new Error('Usuário não tem acesso a este item.');
        }
        // TODO: add no banco de dados
        return;
    }

    async deletar(idOrcamento: number, userId: number) {
        const isValid = await this.validarOrcamento(idOrcamento, userId);
        if (!isValid) {
            throw new Error('Usuário não tem acesso a este item.');
        }
        // TODO: add no banco de dados
        return;
    }
}
