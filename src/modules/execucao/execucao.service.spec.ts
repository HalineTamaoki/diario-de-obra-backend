import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExecucaoService } from './execucao.service';
import { Execucao } from './entity/execucao.entity';
import { DataAdicional } from './entity/data-adicional.entity';
import { ItemObraService } from '../itemObra/itemObra.service';
import { NotFoundException } from '@nestjs/common';
import { EtapasObra } from '../../dto/EtapasObra';

describe('ExecucaoService', () => {
    let service: ExecucaoService;
    let execRepository: Repository<Execucao>;
    let dataRepo: Repository<DataAdicional>;
    let itemObraService: ItemObraService;

    const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn(),
    };

    const mockExecRepository = {
        createQueryBuilder: jest.fn(() => mockQueryBuilder),
        findOne: jest.fn(),
        create: jest.fn(),
        merge: jest.fn(),
        save: jest.fn(),
    };

    const mockDataAdicionalRepository = {
        createQueryBuilder: jest.fn(() => mockQueryBuilder),
        save: jest.fn(),
        merge: jest.fn(),
        delete: jest.fn(),
    };

    const mockItemObraService = {
        validarItemObra: jest.fn(),
        atualizarEtapa: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExecucaoService,
                { provide: getRepositoryToken(Execucao), useValue: mockExecRepository },
                { provide: getRepositoryToken(DataAdicional), useValue: mockDataAdicionalRepository },
                { provide: ItemObraService, useValue: mockItemObraService },
            ],
        }).compile();

        service = module.get<ExecucaoService>(ExecucaoService);
        execRepository = module.get<Repository<Execucao>>(getRepositoryToken(Execucao));
        dataRepo = module.get<Repository<DataAdicional>>(getRepositoryToken(DataAdicional));
        itemObraService = module.get<ItemObraService>(ItemObraService);
    });

    describe('get', () => {
        it('deve retornar detalhes da execução formatados', async () => {
            const mockExec = { 
                id: 1, 
                datasAdicionais: [{ id: 10, nome: 'Teste', data: new Date() }] 
            };
            mockQueryBuilder.getOne.mockResolvedValue(mockExec);

            const result = await service.get(1, 123);

            expect(result.datasAdicionais).toHaveLength(1);
            expect(result.datasAdicionais?.[0].nome).toBe('Teste');
        });

        it('deve retornar objeto vazio se não encontrar execução', async () => {
            mockQueryBuilder.getOne.mockResolvedValue(null);
            const result = await service.get(1, 123);
            expect(result).toEqual({});
        });
    });

    describe('editar', () => {
        it('deve criar nova execução se não existir e atualizar etapa', async () => {
            const dto = { inicio: new Date() };
            mockItemObraService.validarItemObra.mockResolvedValue(true);
            mockExecRepository.findOne.mockResolvedValue(null);
            mockExecRepository.create.mockReturnValue({ ...dto, itemObraId: 1 });

            await service.editar(1, dto as any, 123);

            expect(mockExecRepository.create).toHaveBeenCalled();
            expect(itemObraService.atualizarEtapa).toHaveBeenCalledWith(1, EtapasObra.EXECUCAO);
            expect(mockExecRepository.save).toHaveBeenCalled();
        });

        it('deve fazer merge se a execução já existir', async () => {
            const existente = { id: 1, itemObraId: 1 };
            const dto = { termino: new Date() };
            mockExecRepository.findOne.mockResolvedValue(existente);

            await service.editar(1, dto as any, 123);

            expect(mockExecRepository.merge).toHaveBeenCalledWith(existente, dto);
            expect(mockExecRepository.save).toHaveBeenCalled();
        });
    });

    describe('cadastrarDataAdicional', () => {
        it('deve criar execução automaticamente se não houver ao cadastrar data', async () => {
            const dataDto = { nome: 'Atraso', data: new Date() };
            mockExecRepository.findOne.mockResolvedValue(null);
            mockExecRepository.save.mockResolvedValue({ id: 50 });
            mockDataAdicionalRepository.save.mockResolvedValue({ id: 1, ...dataDto });

            await service.cadastrarDataAdicional(1, dataDto as any, 123);

            expect(mockExecRepository.save).toHaveBeenCalledWith({ itemObraId: 1 });
            expect(itemObraService.atualizarEtapa).toHaveBeenCalledWith(1, EtapasObra.EXECUCAO);
        });
    });

    describe('editarDataAdicional', () => {
        it('deve atualizar a data adicional quando encontrada e pertencer ao usuário', async () => {
            const mockDataExistente = { id: 1, nome: 'Data Antiga', data: new Date() };
            const dto = { nome: 'Data Nova', data: new Date() };
            const dataSalva = { ...mockDataExistente, ...dto };

            mockQueryBuilder.getOne.mockResolvedValue(mockDataExistente);
            
            mockDataAdicionalRepository.merge.mockReturnValue(dataSalva);
            mockDataAdicionalRepository.save.mockResolvedValue(dataSalva);

            const result = await service.editarDataAdicional(1, dto as any, 123);

            expect(mockQueryBuilder.where).toHaveBeenCalledWith('data.id = :id', { id: 1 });
            expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith('obra.usuarioId = :userId', { userId: 123 });
            expect(dataRepo.merge).toHaveBeenCalledWith(mockDataExistente, dto);
            expect(dataRepo.save).toHaveBeenCalledWith(dataSalva);
            expect(result.nome).toBe('Data Nova');
        });
    });

    describe('deletarDataAdicional', () => {
        it('deve deletar se encontrar a data e pertencer ao usuário', async () => {
            mockQueryBuilder.getOne.mockResolvedValue({ id: 10 });

            await service.deletarDataAdicional(10, 123);

            expect(dataRepo.delete).toHaveBeenCalledWith(10);
        });

        it('deve lançar NotFoundException se a data não pertencer ao usuário', async () => {
            mockQueryBuilder.getOne.mockResolvedValue(null);

            await expect(service.deletarDataAdicional(10, 123))
                .rejects.toThrow(NotFoundException);
        });
    });
});