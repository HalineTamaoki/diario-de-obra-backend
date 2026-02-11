import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdNome, Nome } from '../../dto/idNome';
import { ObraDto } from './dto/obra';
import { Obra } from './entity/obra.entity';
import { ObraDetalhada } from './types/obra';

@Injectable()
export class ObraService {
    constructor(
        @InjectRepository(Obra) private obraRepository: Repository<Obra>,
    ) {}

    async validarObra(idUsuario: number, idObra: number): Promise<boolean> {
        const obra = await this.obraRepository.findOne({ where: { id: idObra, usuarioId: idUsuario } });
        return !!obra;
    }
    
    async get(usuarioId: number): Promise<ObraDto[]> {
        const obras = await this.obraRepository
            .createQueryBuilder('obra')
            .leftJoin('obra.itensObra', 'item') 
            .select([
                'obra.id AS id',
                'obra.nome AS nome',
                'obra.usuarioId AS usuarioId'
            ])
            .addSelect(
                'ROUND(COALESCE(AVG(item.ultima_etapa / 3.0), 0) * 100, 2)', 
                'porcentagem'
            )
            .where('obra.usuario_id = :usuarioId', { usuarioId })
            .groupBy('obra.id')
            .getRawMany();

            return obras.map(obra => ({
                ...obra,
                porcentagem: Number(obra.porcentagem)
            }));
    }

    async getById(obraId: number, usuarioId: number): Promise<ObraDetalhada> {
        const obra = await this.obraRepository.createQueryBuilder('obra')
            .leftJoinAndSelect('obra.itensObra', 'item')
            .select([
                'obra.id',
                'obra.nome',
                'item.id',
                'item.nome',
                'item.ultimaEtapa'
            ])
            .where('obra.id = :obraId', { obraId })
            .andWhere('obra.usuarioId = :usuarioId', { usuarioId })
            .orderBy('item.id', 'ASC')
            .getOne();

        if (!obra) {
            throw new NotFoundException('Obra não encontrada ou você não tem permissão para acessá-la.');
        }

        return {
            idObra: obra.id,
            nome: obra.nome,
            items: obra.itensObra.map(item => ({
                id: item.id,
                nome: item.nome,
                ultimaEtapa: item.ultimaEtapa,
            })),
        };
    }
    
    async cadastrar(nomeObra: Nome, userId: number) {
        const novaObra = this.obraRepository.create({ nome: nomeObra.nome, usuarioId: userId });
        return this.obraRepository.save(novaObra);
    }

    async editar(obra: IdNome, userId: number) {
        const obraDb = await this.obraRepository.findOne({ where: { id: obra.id, usuarioId: userId } });
        if (!obraDb) {
            throw new NotFoundException('Obra não encontrada');
        }
        this.obraRepository.merge(obraDb, obra);
        return await this.obraRepository.save(obraDb);
    }

    async deletar(idObra: number, userId: number) {
        const result = await this.obraRepository.delete({ id: idObra, usuarioId: userId });

        if (result.affected === 0) {
            throw new NotFoundException(`Obra com ID ${idObra} não encontrada ou você não tem permissão.`);
        }
    }
}
