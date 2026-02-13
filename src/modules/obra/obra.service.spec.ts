import { Test, TestingModule } from '@nestjs/testing';
import { ObraService } from './obra.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Obra } from './entity/obra.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ObraService', () => {
    let service: ObraService;
    let repository: Repository<Obra>;

    const mockObra = { id: 1, nome: 'Minha Obra', usuarioId: 10 };

    const queryBuilderMock = {
        leftJoin: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn(),
        getOne: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ObraService,
                {
                    provide: getRepositoryToken(Obra),
                    useValue: {
                        findOne: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                        merge: jest.fn(),
                        delete: jest.fn(),
                        createQueryBuilder: jest.fn(() => queryBuilderMock),
                    },
                },
            ],
        }).compile();

        service = module.get<ObraService>(ObraService);
        repository = module.get<Repository<Obra>>(getRepositoryToken(Obra));
    });

    describe('getById', () => {
        it('deve retornar a obra detalhada se encontrada', async () => {
            const mockObraCompleta = { 
                id: 1, 
                nome: 'Obra 1', 
                itensObra: [{ id: 1, nome: 'Item 1', ultimaEtapa: 2 }] 
            };
            queryBuilderMock.getOne.mockResolvedValue(mockObraCompleta);

            const result = await service.getById(1, 10);

            expect(result.idObra).toBe(1);
            expect(result.items).toHaveLength(1);
        });

        it('deve lançar NotFoundException se a obra não existir ou pertencer a outro usuário', async () => {
            queryBuilderMock.getOne.mockResolvedValue(null);
            await expect(service.getById(99, 10)).rejects.toThrow(NotFoundException);
        });
    });

    describe('deletar', () => {
        it('deve deletar com sucesso', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);
            await expect(service.deletar(1, 10)).resolves.not.toThrow();
        });

        it('deve lançar erro se nada for deletado (id inexistente)', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0 } as any);
            await expect(service.deletar(1, 10)).rejects.toThrow(NotFoundException);
        });
    });

    describe('cadastrar', () => {
        it('deve criar e salvar uma nova obra', async () => {
            const dto = { nome: 'Nova Obra' };
            jest.spyOn(repository, 'create').mockReturnValue(mockObra as any);
            jest.spyOn(repository, 'save').mockResolvedValue(mockObra as any);

            const result = await service.cadastrar(dto, 10);
            expect(repository.create).toHaveBeenCalledWith({ nome: dto.nome, usuarioId: 10 });
            expect(result).toEqual(mockObra);
        });
    });
});