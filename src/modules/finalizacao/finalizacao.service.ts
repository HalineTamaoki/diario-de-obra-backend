import { Injectable } from '@nestjs/common';
import { Selecionar } from 'src/dto/selecionar';
import { ItemObraService } from '../itemObra/itemObra.service';
import { EditarComentario, FinalizacaoDto } from './dto/finalizacao';

@Injectable()
export class FinalizacaoService {
    constructor(private readonly itemObraService: ItemObraService) {}

    async get(idItem: number, userId: number): Promise<FinalizacaoDto> {
        const isValid = await this.itemObraService.validarItemObra(userId, idItem);
        if (!isValid) {
            throw new Error('Usuário não tem acesso a este item.');
        }
        // TODO: add no banco de dados
        return {} as FinalizacaoDto;
    }

    async editarComentario(idItem: number, comentario: EditarComentario, userId: number) {
        const isValid = await this.itemObraService.validarItemObra(userId, idItem);
        if (!isValid) {
            throw new Error('Usuário não tem acesso a este item.');
        }
        // TODO: add no banco de dados
        return;
    }

    async selecionarFinalizado(idItem: number, selecionarFinalizado: Selecionar, userId: number) {
        const isValid = await this.itemObraService.validarItemObra(userId, idItem);
        if (!isValid) {
            throw new Error('Usuário não tem acesso a este item.');
        }
        // TODO: add no banco de dados
        return;
    }
}
