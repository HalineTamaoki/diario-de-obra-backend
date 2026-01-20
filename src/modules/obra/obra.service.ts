import { Injectable } from '@nestjs/common';
import { Obra } from './dto/obra';

@Injectable()
export class ObraService {
    async cadastrar(obra: Obra) {
        // TODO: add no banco de dados
        return;
    }

    async editar(obra: Obra) {
        // TODO: add no banco de dados
        return;
    }
}
