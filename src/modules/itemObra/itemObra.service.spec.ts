import { Test, TestingModule } from '@nestjs/testing';
import { ItemObraService } from './itemObra.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ItemObra } from './entity/itemObra.entity';
import { ObraService } from '../obra/obra.service';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { EtapasObra } from '../../dto/EtapasObra';

describe('ItemObraService', () => {
    let service: ItemObraService;
    let repository: Repository<ItemObra>;
    let obraService: ObraService;

    const mockQueryBuilder = {
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getCount: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ItemObraService,
                {
                    provide: ObraService,
                    useValue: { validarObra: jest.fn() },
                },
                {
                    provide: getRepositoryToken(ItemObra),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        findOne: jest.fn(),
                        merge: jest.fn(),
                        delete: jest.fn(),
                        update: jest.fn(),
                        createQueryBuilder: jest.fn(() => mockQueryBuilder),
                    },
                },
            ],
        }).compile();

        service = module.get<ItemObraService>(ItemObraService);
        repository = module.get<Repository<ItemObra>>(getRepositoryToken(ItemObra));
        obraService = module.get<ObraService>(ObraService);
    });

    describe('validarItemObra', () => {
        it('deve retornar true se o item existir e pertencer ao usuário', async () => {
            mockQueryBuilder.getCount.mockResolvedValue(1);
            const result = await service.validarItemObra(1, 100);
            expect(result).toBe(true);
        });

        it('deve lançar NotFoundException se o item não pertencer ao usuário', async () => {
            mockQueryBuilder.getCount.mockResolvedValue(0);
            await expect(service.validarItemObra(1, 100)).rejects.toThrow(NotFoundException);
        });
    });

    describe('cadastrar', () => {
        it('deve cadastrar com sucesso se a obra for válida', async () => {
            jest.spyOn(obraService, 'validarObra').mockResolvedValue(true);
            jest.spyOn(repository, 'create').mockReturnValue({ id: 1 } as any);
            jest.spyOn(repository, 'save').mockResolvedValue({ id: 1 } as any);

            const result = await service.cadastrar(1, { nome: 'Item Teste' }, 10);
            expect(result).toBeDefined();
            expect(repository.save).toHaveBeenCalled();
        });

        it('deve lançar NotFoundException se a obra for inválida', async () => {
            jest.spyOn(obraService, 'validarObra').mockResolvedValue(false);
            await expect(service.cadastrar(1, { nome: 'X' }, 10)).rejects.toThrow(NotFoundException);
        });
    });

    describe('editar', () => {
        it('deve editar um item com sucesso', async () => {
            const itemDto = { id: 1, nome: 'Nome Editado' };
            const itemDb = { id: 1, nome: 'Nome Antigo' };

            jest.spyOn(service, 'validarItemObra').mockResolvedValue(true);
            jest.spyOn(repository, 'findOne').mockResolvedValue(itemDb as any);
            jest.spyOn(repository, 'save').mockResolvedValue({ ...itemDb, ...itemDto } as any);

            const result = await service.editar(itemDto, 10);

            expect(repository.merge).toHaveBeenCalledWith(itemDb, itemDto);
            expect(repository.save).toHaveBeenCalled();
            expect(result.nome).toBe('Nome Editado');
        });

        it('deve lançar NotFoundException se o item não for encontrado no banco após validar', async () => {
            jest.spyOn(service, 'validarItemObra').mockResolvedValue(true);
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);

            await expect(service.editar({ id: 1, nome: 'X' }, 10)).rejects.toThrow(NotFoundException);
        });
    });

    describe('deletar', () => {
        it('deve deletar um item com sucesso', async () => {
            jest.spyOn(service, 'validarItemObra').mockResolvedValue(true);
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

            await expect(service.deletar(1, 10)).resolves.not.toThrow();
            expect(repository.delete).toHaveBeenCalledWith({ id: 1 });
        });

        it('deve lançar NotFoundException se o delete retornar zero linhas afetadas', async () => {
            jest.spyOn(service, 'validarItemObra').mockResolvedValue(true);
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0 } as any);

            await expect(service.deletar(1, 10)).rejects.toThrow(NotFoundException);
        });
    });

    describe('atualizarEtapa', () => {
        it('deve atualizar a etapa se a nova for maior que a atual', async () => {
            const item = { id: 1, ultimaEtapa: 1 }; 
            jest.spyOn(repository, 'findOne').mockResolvedValue(item as any);

            await service.atualizarEtapa(1, 2);

            expect(repository.update).toHaveBeenCalledWith(1, { ultimaEtapa: 2 });
        });

        it('NÃO deve atualizar se a nova etapa for menor e o flag reverter for falso', async () => {
            const item = { id: 1, ultimaEtapa: 3 }; 
            jest.spyOn(repository, 'findOne').mockResolvedValue(item as any);

            await service.atualizarEtapa(1, 2); 

            expect(repository.update).not.toHaveBeenCalled();
        });

        it('deve permitir atualizar para uma etapa menor se o flag reverter for true', async () => {
            const item = { id: 1, ultimaEtapa: 3 };
            jest.spyOn(repository, 'findOne').mockResolvedValue(item as any);

            await service.atualizarEtapa(1, 1, true);

            expect(repository.update).toHaveBeenCalledWith(1, { ultimaEtapa: 1 });
        });

        it('não deve fazer nada se o item não for encontrado', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            await service.atualizarEtapa(1, 1, true);
            expect(repository.update).not.toHaveBeenCalled();
        });
    });

    describe('reverterEtapaOrcamento', () => {
        const ITEM_ID = 1;
        
        it('deve reverter a etapa para 0 quando as condições forem atendidas', async () => {
            const mockItem = { 
                id: ITEM_ID, 
                ultimaEtapa: EtapasObra.ORCAMENTO, 
                orcamentos: [] 
            };
            jest.spyOn(repository, 'findOne').mockResolvedValue(mockItem as any);
            jest.spyOn(repository, 'update');

            await service.reverterEtapaOrcamento(ITEM_ID);

            expect(repository.findOne).toHaveBeenCalledWith({
                where: { id: ITEM_ID },
                relations: ['orcamentos'],
            });
            expect(repository.update).toHaveBeenCalledWith(ITEM_ID, { ultimaEtapa: 0 });
        });

        it('não deve atualizar se o item tiver orçamentos vinculados', async () => {
            const mockItem = { 
                id: ITEM_ID, 
                ultimaEtapa: EtapasObra.ORCAMENTO, 
                orcamentos: [{ id: 10 }] 
            };
            jest.spyOn(repository, 'findOne').mockResolvedValue(mockItem as any);

            await service.reverterEtapaOrcamento(ITEM_ID);
            expect(repository.update).not.toHaveBeenCalled();
        });

        it('não deve atualizar se a etapa atual não for ORCAMENTO', async () => {
            const mockItem = { 
                id: ITEM_ID, 
                ultimaEtapa: 5,
                orcamentos: [] 
            };
            jest.spyOn(repository, 'findOne').mockResolvedValue(mockItem as any);

            await service.reverterEtapaOrcamento(ITEM_ID);
            expect(repository.update).not.toHaveBeenCalled();
        });

        it('não deve fazer nada se o item não for encontrado', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            await service.reverterEtapaOrcamento(ITEM_ID);
            expect(repository.update).not.toHaveBeenCalled();
        });
    });
});