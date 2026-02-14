import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrcamentoService } from './orcamento.service';
import { Orcamento } from './entity/orcamento.entity';
import { ItemObraService } from '../itemObra/itemObra.service';
import { NotFoundException } from '@nestjs/common';
import { EtapasObra } from '../../dto/EtapasObra';

describe('OrcamentoService', () => {
    let service: OrcamentoService;
    let repository: Repository<Orcamento>;
    let itemObraService: ItemObraService;

    const mockQueryBuilder = {
        innerJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn(),
        getMany: jest.fn(),
    };

    const mockOrcamentoRepository = {
        createQueryBuilder: jest.fn(() => mockQueryBuilder),
        create: jest.fn(),
        save: jest.fn(),
        merge: jest.fn(),
        delete: jest.fn(),
    };

    const mockItemObraService = {
        validarItemObra: jest.fn(),
        atualizarEtapa: jest.fn(),
        reverterEtapaOrcamento: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrcamentoService,
                {
                provide: getRepositoryToken(Orcamento),
                useValue: mockOrcamentoRepository,
                },
                {
                provide: ItemObraService,
                useValue: mockItemObraService,
                },
            ],
        }).compile();

        service = module.get<OrcamentoService>(OrcamentoService);
        repository = module.get<Repository<Orcamento>>(getRepositoryToken(Orcamento));
        itemObraService = module.get<ItemObraService>(ItemObraService);
    });

    describe('validarOrcamento', () => {
        it('deve retornar o orçamento se pertencer ao usuário', async () => {
            const mockOrcamento = { id: 1 };
            mockQueryBuilder.getOne.mockResolvedValue(mockOrcamento);

            const result = await service.validarOrcamento(1, 123);

            expect(result).toEqual(mockOrcamento);
            expect(mockQueryBuilder.where).toHaveBeenCalledWith('orcamento.id = :orcamentoId', { orcamentoId: 1 });
        });

        it('deve lançar NotFoundException se o orçamento não for encontrado ou não pertencer ao usuário', async () => {
            mockQueryBuilder.getOne.mockResolvedValue(null);

            await expect(service.validarOrcamento(1, 123)).rejects.toThrow(NotFoundException);
        });
    });

    describe('getDetalhes', () => {
        it('deve retornar o orçamento validado', async () => {
            const mockOrcamento = { id: 1 };
            mockQueryBuilder.getOne.mockResolvedValue(mockOrcamento);

            const result = await service.getDetalhes(1, 123);

            expect(result).toEqual(mockOrcamento);
            expect(mockQueryBuilder.where).toHaveBeenCalledWith('orcamento.id = :orcamentoId', { orcamentoId: 1 });
        });
    });

    describe('cadastrar', () => {
        it('deve cadastrar orçamento e atualizar a etapa da obra', async () => {
            const dto = { empresa: 'Engenharia X', valor: 1000 };
            const orcamentoEntity = { id: 1, ...dto, itemObraId: 10 };
            
            mockItemObraService.validarItemObra.mockResolvedValue(true);
            mockOrcamentoRepository.create.mockReturnValue(orcamentoEntity);
            mockOrcamentoRepository.save.mockResolvedValue(orcamentoEntity);

            const result = await service.cadastrar(10, dto as any, 123);

            expect(itemObraService.validarItemObra).toHaveBeenCalledWith(123, 10);
            expect(itemObraService.atualizarEtapa).toHaveBeenCalledWith(10, EtapasObra.ORCAMENTO);
            expect(result).toEqual(orcamentoEntity);
        });
    });

    describe('editar', () => {
        it('deve atualizar os dados de um orçamento existente', async () => {
            const mockOrcamentoDb = { id: 1, empresa: 'Antiga' };
            const dto = { id: 1, empresa: 'Nova' };
            
            jest.spyOn(service, 'validarOrcamento').mockResolvedValue(mockOrcamentoDb as any);
            mockOrcamentoRepository.save.mockResolvedValue({ ...mockOrcamentoDb, ...dto });

            await service.editar(dto as any, 123);

            expect(repository.merge).toHaveBeenCalledWith(mockOrcamentoDb, dto);
            expect(repository.save).toHaveBeenCalled();
        });
    });

    describe('deletar', () => {
        it('deve deletar o orçamento e reverter a etapa da obra', async () => {
            const mockOrcamento = { id: 1, itemObraId: 10 };
            jest.spyOn(service, 'validarOrcamento').mockResolvedValue(mockOrcamento as any);

            await service.deletar(1, 123);

            expect(repository.delete).toHaveBeenCalledWith({ id: 1 });
            expect(itemObraService.reverterEtapaOrcamento).toHaveBeenCalledWith(10);
        });
    });
});