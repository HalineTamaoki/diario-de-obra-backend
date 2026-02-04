import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemObraService } from '../itemObra/itemObra.service';
import { IdeiaDto, NovaIdeiaDto } from './dto/ideacao';
import { Ideia } from './entity/ideia.entity';

@Injectable()
export class IdeacaoService {
    constructor(
        private readonly itemObraService: ItemObraService,
        @InjectRepository(Ideia) private ideacaoRepository: Repository<Ideia>,
    ) {} 

    async get(itemId: number, usuarioId: number): Promise<IdeiaDto[]> {
        return this.ideacaoRepository.createQueryBuilder('ideia')
            .innerJoin('ideia.itemObra', 'item')
            .innerJoin('item.obra', 'obra')
            .select([
                'ideia.id',
                'ideia.link'
            ])
            .where('ideia.item_obra_id = :itemId', { itemId })
            .andWhere('obra.usuario_id = :usuarioId', { usuarioId })
            .getMany();
    }

    async cadastrar(idItem: number, ideia: NovaIdeiaDto, userId: number) {
        await this.itemObraService.validarItemObra(userId, idItem);
        const ideiaEntity = this.ideacaoRepository.create({ ...ideia, itemObraId: idItem });
        await this.ideacaoRepository.save(ideiaEntity);
        return ideiaEntity;
    }

    async deletar(id: number, userId: number) {
        const ideia = await this.ideacaoRepository.findOne({ where: { id } });
        if(!ideia) {
            throw new NotFoundException('Ideia não encontrada.');
        }
        await this.itemObraService.validarItemObra(userId, ideia.itemObraId);
        await this.ideacaoRepository.delete({ id })
    };
}
