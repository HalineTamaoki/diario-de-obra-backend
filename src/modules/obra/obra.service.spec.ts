import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obra } from './entity/obra.entity';
import { ObraService } from './obra.service';

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

    describe('validarObra', () => {
        it('deve retornar true se a obra for encontrada', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue({ id: 1 } as Obra);
            
            const result = await service.validarObra(1, 10);
            
            expect(result).toBe(true);
            expect(repository.findOne).toHaveBeenCalledWith({ 
                where: { id: 10, usuarioId: 1 } 
            });
        });

        it('deve retornar false se a obra não for encontrada', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            
            const result = await service.validarObra(1, 10);
            
            expect(result).toBe(false);
        });
    });

    describe('get', () => {
        it('deve retornar uma lista de obras com a porcentagem formatada como número', async () => {
            const mockRawData = [
                { id: 1, nome: 'Obra A', usuarioId: 1, porcentagem: '33.33' },
                { id: 2, nome: 'Obra B', usuarioId: 1, porcentagem: '0' }
            ];

            queryBuilderMock.getRawMany.mockResolvedValue(mockRawData);

            const result = await service.get(1);

            expect(repository.createQueryBuilder).toHaveBeenCalledWith('obra');
            expect(queryBuilderMock.where).toHaveBeenCalledWith('obra.usuario_id = :usuarioId', { usuarioId: 1 });
            
            expect(result).toEqual([
                { id: 1, nome: 'Obra A', usuarioId: 1, porcentagem: 33.33 },
                { id: 2, nome: 'Obra B', usuarioId: 1, porcentagem: 0 }
            ]);
            expect(typeof result[0].porcentagem).toBe('number');
        });

        it('deve retornar array vazio se nenhuma obra for encontrada', async () => {
            queryBuilderMock.getRawMany.mockResolvedValue([]);
            
            const result = await service.get(1);
            
            expect(result).toEqual([]);
        });
    });

    describe('editar', () => {
        const USER_ID = 1;
        const MOCK_OBRA_DTO = { id: 10, nome: 'Obra Atualizada' };

        it('deve atualizar e salvar a obra com sucesso', async () => {
            const obraExistente = { id: 10, nome: 'Nome Antigo', usuarioId: USER_ID };
            const obraSalva = { ...obraExistente, nome: 'Obra Atualizada' };

            jest.spyOn(repository, 'findOne').mockResolvedValue(obraExistente as Obra);
            jest.spyOn(repository, 'merge').mockImplementation((target, source) => {
                return Object.assign(target, source);
            });            
            jest.spyOn(repository, 'save').mockResolvedValue(obraSalva as any);

            const result = await service.editar(MOCK_OBRA_DTO, USER_ID);

            expect(repository.findOne).toHaveBeenCalledWith({ 
                where: { id: MOCK_OBRA_DTO.id, usuarioId: USER_ID } 
            });
            expect(repository.save).toHaveBeenCalledWith(obraSalva);
            expect(result).toEqual(obraSalva);
        });

        it('deve lançar NotFoundException se a obra não for encontrada ou não pertencer ao usuário', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);

            await expect(service.editar(MOCK_OBRA_DTO, USER_ID))
                .rejects
                .toThrow(NotFoundException);
            
            expect(repository.merge).not.toHaveBeenCalled();
            expect(repository.save).not.toHaveBeenCalled();
        });
    });
});