import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EtapasObra } from 'src/dto/EtapasObra';
import { Repository } from 'typeorm';
import { ItemObraService } from '../itemObra/itemObra.service';
import { DataAdicionalDto, NovaDataAdicional } from './dto/dataAdicional';
import { ExecucaoDto, ExecucaoDtoDetalhes } from './dto/execucao';
import { DataAdicional } from './entity/data-adicional.entity';
import { Execucao } from './entity/execucao.entity';

@Injectable()
export class ExecucaoService {
    constructor(
        private readonly itemObraService: ItemObraService,
        @InjectRepository(Execucao) private execucaoRepository: Repository<Execucao>,
        @InjectRepository(DataAdicional) private dataAdicionalRepository: Repository<DataAdicional>,
    ) {} 

    async get(itemObraId: number, usuarioId: number): Promise<ExecucaoDtoDetalhes> {
        const execucao = await this.execucaoRepository.createQueryBuilder('exec')
            .leftJoinAndSelect('exec.datasAdicionais', 'data')
            .innerJoin('exec.itemObra', 'item')
            .innerJoin('item.obra', 'obra')
            .where('exec.itemObraId = :itemObraId', { itemObraId })
            .andWhere('obra.usuarioId = :usuarioId', { usuarioId })
            .getOne();

        if (!execucao) {
            return {};
        }

        return {
            ...execucao,
            datasAdicionais: execucao.datasAdicionais.map(d => ({
                id: d.id,
                nome: d.nome,
                data: d.data
            }))
        };
    }

    async editar(itemObraId: number, execucao: ExecucaoDto, userId: number) {
        await this.itemObraService.validarItemObra(userId, itemObraId);

        const existente = await this.execucaoRepository.findOne({ where: { itemObraId } });

        let novaExecucao: Execucao;
        if (!existente) {
            novaExecucao = this.execucaoRepository.create({...execucao, itemObraId});
        } else {
            novaExecucao = existente;
            novaExecucao = this.execucaoRepository.merge(novaExecucao, execucao);
        }

        if(execucao.inicio || execucao.termino){
            await this.itemObraService.atualizarEtapa(itemObraId, EtapasObra.EXECUCAO);
        }
        return await this.execucaoRepository.save(novaExecucao);
    }

    async cadastrarDataAdicional(
        idItem: number,
        data: NovaDataAdicional,
        userId: number,
    ): Promise<DataAdicionalDto> {
        await this.itemObraService.validarItemObra(userId, idItem);

        let execucao = await this.execucaoRepository.findOne({ where: { itemObraId: idItem } });
        if (!execucao) {
            execucao = await this.execucaoRepository.save({ itemObraId: idItem });
        }

        const novaDataAdicional = await this.dataAdicionalRepository.save({
            ...data,
            execucao,
        });
        await this.itemObraService.atualizarEtapa(idItem, EtapasObra.EXECUCAO);

        return {
            id: novaDataAdicional.id,
            data: novaDataAdicional.data,
            nome: novaDataAdicional.nome,
        } as DataAdicionalDto;
    }

    async editarDataAdicional(
        id: number,
        data: NovaDataAdicional,
        userId: number,
    ): Promise<DataAdicionalDto> {
        const dataExistente = await this.dataAdicionalRepository.createQueryBuilder('data')
            .innerJoin('data.execucao', 'exec')
            .innerJoin('exec.itemObra', 'item')
            .innerJoin('item.obra', 'obra')
            .where('data.id = :id', { id })
            .andWhere('obra.usuarioId = :userId', { userId })
            .getOne();

        if (!dataExistente) {
            throw new NotFoundException('Data adicional não encontrada ou você não tem permissão para editá-la.');
        }

        const dataAtualizada = this.dataAdicionalRepository.merge(dataExistente, data);

        const salvo = await this.dataAdicionalRepository.save(dataAtualizada);
        return {
            id: salvo.id,
            nome: salvo.nome,
            data: salvo.data,
        };
    }

    async deletarDataAdicional(id: number, usuarioId: number) {
        const dataExistente = await this.dataAdicionalRepository.createQueryBuilder('data')
            .innerJoin('data.execucao', 'exec')
            .innerJoin('exec.itemObra', 'item')
            .innerJoin('item.obra', 'obra')
            .where('data.id = :id', { id })
            .andWhere('obra.usuarioId = :usuarioId', { usuarioId })
            .getOne();

        if (!dataExistente) {
        throw new NotFoundException('Data adicional não encontrada ou você não tem permissão para excluí-la.');
        }

        await this.dataAdicionalRepository.delete(id);
    }
}
