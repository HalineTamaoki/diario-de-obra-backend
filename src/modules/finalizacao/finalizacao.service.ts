import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EtapasObra } from 'src/dto/EtapasObra';
import { Selecionar } from 'src/dto/selecionar';
import { Repository } from 'typeorm';
import { ItemObraService } from '../itemObra/itemObra.service';
import { EditarComentario, EditarData, FinalizacaoType } from './dto/finalizacao';
import { Finalizacao } from './entity/finalizacao.entity';

@Injectable()
export class FinalizacaoService {
    constructor(
        @InjectRepository(Finalizacao) private finalizacaoRepository: Repository<Finalizacao>,
        private readonly itemObraService: ItemObraService,
    ) {}

    async get(itemObraId: number, usuarioId: number): Promise<Partial<FinalizacaoType>> {
        const finalizacao = await this.finalizacaoRepository.createQueryBuilder('finalizacao')
                .select(['finalizacao.id', 'finalizacao.data', 'finalizacao.comentarios'])
                .innerJoin('finalizacao.itemObra', 'item')
                .innerJoin('item.obra', 'obra')
                .where('finalizacao.itemObraId = :itemObraId', { itemObraId })
                .andWhere('obra.usuarioId = :usuarioId', { usuarioId })
                .getOne();
        return finalizacao === null ? {} : finalizacao;
    }

    async editar(itemObraId: number, finalizacao: Partial<FinalizacaoType>, usuarioId: number): Promise<FinalizacaoType> {
        await this.itemObraService.validarItemObra(usuarioId, itemObraId);
        const existente = await this.finalizacaoRepository.findOne({where: { itemObraId }});

        let novaFinalizacao: Finalizacao;
        if (!existente) {
            novaFinalizacao = this.finalizacaoRepository.create({...finalizacao, itemObraId});
        } else {
            novaFinalizacao = existente;
            novaFinalizacao = this.finalizacaoRepository.merge(novaFinalizacao, finalizacao);
        }
        const finalizacaoSalva = await this.finalizacaoRepository.save(novaFinalizacao);
        return {
            id: finalizacaoSalva.id,
            data: finalizacaoSalva.data,
            comentarios: finalizacaoSalva.comentarios,
        };
    }

    async editarComentario(itemObraId: number, comentario: EditarComentario, usuarioId: number): Promise<FinalizacaoType> {
        return await this.editar(itemObraId, { comentarios: comentario.comentarios }, usuarioId);
    }

    async editarData(itemObraId: number, data: EditarData, usuarioId: number): Promise<FinalizacaoType> {
        const finalizacao = await this.editar(itemObraId, { data: data.data }, usuarioId);
        await this.itemObraService.atualizarEtapa(itemObraId, EtapasObra.FINALIZADO);
        return finalizacao;
    }

    async selecionarFinalizado(itemObraId: number, selecionarFinalizado: Selecionar, userId: number) {
        const novaFinalizacao = { data: selecionarFinalizado.selecionado ? new Date() : null as any };
        const finalizacao = await this.editar(itemObraId, novaFinalizacao , userId);
        await this.itemObraService.atualizarEtapa(itemObraId, EtapasObra.FINALIZADO, !selecionarFinalizado.selecionado);
        return finalizacao;
    }
}
