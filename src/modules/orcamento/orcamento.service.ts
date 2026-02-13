import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Selecionar } from '../../dto/selecionar';
import { Repository } from 'typeorm';
import { ItemObraService } from '../itemObra/itemObra.service';
import { OrcamentoDetalhes, OrcamentoDetalhesId, OrcamentoResumo } from './dto/orcamento';
import { Orcamento } from './entity/orcamento.entity';
import { EtapasObra } from '../../dto/EtapasObra';

@Injectable()
export class OrcamentoService {
    constructor(
        private readonly itemObraService: ItemObraService,
        @InjectRepository(Orcamento) private orcamentoRepository: Repository<Orcamento>,
    ) {} 

    async validarOrcamento(orcamentoId: number, usuarioId: number): Promise<Orcamento> {
        const orcamento = await this.orcamentoRepository.createQueryBuilder('orcamento')
            .innerJoin('orcamento.itemObra', 'item') 
            .innerJoin('item.obra', 'obra')         
            .where('orcamento.id = :orcamentoId', { orcamentoId })
            .andWhere('obra.usuario_id = :usuarioId', { usuarioId })
            .getOne();

        if (!orcamento) {
            throw new NotFoundException('Este orçamento não pertence às suas obras ou não existe.');
        }

        return orcamento;
    }

    async get(itemId: number, usuarioId: number): Promise<OrcamentoResumo[]> {
        return await this.orcamentoRepository.createQueryBuilder('orcamento')
            .innerJoin('orcamento.itemObra', 'item')
            .innerJoin('item.obra', 'obra')         
            .select([
                'orcamento.id',
                'orcamento.selecionado',
                'orcamento.empresa',
                'orcamento.valor'
            ])
            .where('orcamento.item_obra_id = :itemId', { itemId })
            .andWhere('obra.usuario_id = :usuarioId', { usuarioId })
            .getMany();
    }

    async getDetalhes(idOrcamento: number, userId: number): Promise<OrcamentoDetalhesId> {
        return await this.validarOrcamento(idOrcamento, userId);
    }

    async cadastrar(idItem: number, orcamento: OrcamentoDetalhes, userId: number) {
        await this.itemObraService.validarItemObra(userId, idItem);
        const orcamentoEntity = this.orcamentoRepository.create({ ...orcamento, itemObraId: idItem });
        await this.orcamentoRepository.save(orcamentoEntity);
        await this.itemObraService.atualizarEtapa(idItem, EtapasObra.ORCAMENTO);
        return orcamentoEntity;
    }

    async editar(orcamento: OrcamentoDetalhesId, userId: number) {
        const orcamentoDb = await this.validarOrcamento(orcamento.id, userId);
        this.orcamentoRepository.merge(orcamentoDb, orcamento);
        return await this.orcamentoRepository.save(orcamentoDb);        
    }

    async selecionar(idOrcamento: number, selecionado: Selecionar, userId: number) {
        const orcamento = await this.validarOrcamento(idOrcamento, userId);
        this.orcamentoRepository.merge(orcamento, selecionado);
        await this.orcamentoRepository.save(orcamento);
    }

    async deletar(idOrcamento: number, userId: number) {
        const orcamento = await this.validarOrcamento(idOrcamento, userId);
        await this.orcamentoRepository.delete({ id: idOrcamento });
        await this.itemObraService.reverterEtapaOrcamento(orcamento.itemObraId);
    }
}
