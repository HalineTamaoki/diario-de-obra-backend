import { Injectable } from '@nestjs/common';
import { IdNome } from '../../dto/idNome';
import { ItemObraDto } from './dto/itemObra';

@Injectable()
export class ItemObraService {
    
    async validarItemObra(idUsuario: number, idItemObra: number): Promise<boolean> {
        //TODO: consultar se o itemObra pertence ao usuario
        return true;
    }  

    async get(idObra: number, userId: number): Promise<ItemObraDto[]> {
        // TODO: add no banco de dados
        return [];
    }

    async cadastrar(idObra: number, itemObra: IdNome, userId: number) {
        // TODO: add no banco de dados
        return;
    }

    async editar(idObra: number, itemObra: IdNome, userId: number) {
        // TODO: add no banco de dados
        return;
    }

    async deletar(idObra: number, userId: number) {
        // TODO: add no banco de dados
        return;
    }
}
