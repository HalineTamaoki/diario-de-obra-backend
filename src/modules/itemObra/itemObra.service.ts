import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdNome, Nome } from '../../dto/idNome';
import { ObraService } from '../obra/obra.service';
import { ItemObraDto } from './dto/itemObra';
import { ItemObra } from './entity/itemObra.entity';

@Injectable()
export class ItemObraService {
    constructor(
        private obraService: ObraService,
        @InjectRepository(ItemObra) private itemObraRepository: Repository<ItemObra>,
    ) {}

    async validarItemObra(usuarioId: number, idItemObra: number): Promise<boolean> {
        const existe = await this.itemObraRepository.createQueryBuilder('item')
            .innerJoin('item.obra', 'obra')
            .where('item.id = :itemId', { itemId: idItemObra })
            .andWhere('obra.usuario_id = :usuarioId', { usuarioId })
            .getCount();

        if (existe === 0) {
            throw new NotFoundException('Este item não pertence a você ou não existe.');
        }

        return true;
    }  

    async get(obraId: number, userId: number): Promise<ItemObraDto[]> {
        const obraValida = await this.obraService.validarObra(userId, obraId);
        if (!obraValida) {
            throw new NotFoundException('Obra não encontrada ou você não tem permissão.');
        }
        return this.itemObraRepository.find({ where: { obraId } });
    }

    async cadastrar(idObra: number, itemObra: Nome, userId: number) {
        const obraValida = await this.obraService.validarObra(userId, idObra);
        if (!obraValida) {
            throw new NotFoundException('Obra não encontrada ou você não tem permissão.');
        }

        const itemObraEntity = this.itemObraRepository.create({ nome: itemObra.nome, obraId: idObra });
        return this.itemObraRepository.save(itemObraEntity);
    }

    async editar(itemObra: IdNome, userId: number) {
        await this.validarItemObra(userId, itemObra.id);
        const itemObraDb = await this.itemObraRepository.findOne({ where: { id: itemObra.id } });
        if (!itemObraDb) {
            throw new NotFoundException('Item de obra não encontrado');
        }
        this.itemObraRepository.merge(itemObraDb, itemObra);
        return await this.itemObraRepository.save(itemObraDb);        
    }

    async deletar(idItem: number, userId: number) {
        await this.validarItemObra(userId, idItem);
        const result = await this.itemObraRepository.delete({ id: idItem});

        if (result.affected === 0) {
            throw new NotFoundException(`Obra com ID ${idItem} não encontrado.`);
        }
    }
}
