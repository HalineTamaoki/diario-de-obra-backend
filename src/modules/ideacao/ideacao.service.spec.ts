import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdeacaoService } from './ideacao.service';
import { Ideia } from './entity/ideia.entity';
import { ItemObraService } from '../itemObra/itemObra.service';
import { NotFoundException } from '@nestjs/common';

describe('IdeacaoService', () => {
    let service: IdeacaoService;
    let repository: Repository<Ideia>;
    let itemObraService: ItemObraService;

    // Mock do QueryBuilder do TypeORM
    const mockQueryBuilder = {
        innerJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn(),
    };

    const mockIdeacaoRepository = {
        createQueryBuilder: jest.fn(() => mockQueryBuilder),
        create: jest.fn(),
        save: jest.fn(),
        findOne: jest.fn(),
        delete: jest.fn(),
    };

    const mockItemObraService = {
        validarItemObra: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IdeacaoService,
                {
                    provide: getRepositoryToken(Ideia),
                    useValue: mockIdeacaoRepository,
                },
                {
                    provide: ItemObraService,
                    useValue: mockItemObraService,
                },
            ],
        }).compile();

        service = module.get<IdeacaoService>(IdeacaoService);
        repository = module.get<Repository<Ideia>>(getRepositoryToken(Ideia));
        itemObraService = module.get<ItemObraService>(ItemObraService);
    });

    it('deve estar definido', () => {
        expect(service).toBeDefined();
    });

    describe('get', () => {
        it('deve retornar uma lista de ideias filtradas', async () => {
            const mockIdeias = [{ id: 1, link: 'http://link.com' }];
            mockQueryBuilder.getMany.mockResolvedValue(mockIdeias);

            const result = await service.get(1, 123);

            expect(result).toEqual(mockIdeias);
            expect(mockQueryBuilder.where).toHaveBeenCalledWith('ideia.item_obra_id = :itemId', { itemId: 1 });
            expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith('obra.usuario_id = :usuarioId', { usuarioId: 123 });
        });
    });

    describe('cadastrar', () => {
        it('deve cadastrar uma nova ideia com sucesso após validar o item', async () => {
            const dto = { link: 'http://nova-ideia.com' };
            const ideiaEntity = { id: 1, ...dto, itemObraId: 10 };
            
            mockItemObraService.validarItemObra.mockResolvedValue(true);
            mockIdeacaoRepository.create.mockReturnValue(ideiaEntity);
            mockIdeacaoRepository.save.mockResolvedValue(ideiaEntity);

            const result = await service.cadastrar(10, dto, 123);

            expect(itemObraService.validarItemObra).toHaveBeenCalledWith(123, 10);
            expect(repository.create).toHaveBeenCalled();
            expect(repository.save).toHaveBeenCalledWith(ideiaEntity);
            expect(result).toEqual(ideiaEntity);
        });
    });

    describe('deletar', () => {
        it('deve deletar uma ideia se ela existir e o usuário tiver permissão', async () => {
            const mockIdeia = { id: 1, itemObraId: 10 };
            mockIdeacaoRepository.findOne.mockResolvedValue(mockIdeia);
            mockItemObraService.validarItemObra.mockResolvedValue(true);

            await service.deletar(1, 123);

            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(itemObraService.validarItemObra).toHaveBeenCalledWith(123, 10);
            expect(repository.delete).toHaveBeenCalledWith({ id: 1 });
        });

        it('deve lançar NotFoundException se a ideia não existir', async () => {
            mockIdeacaoRepository.findOne.mockResolvedValue(null);

            await expect(service.deletar(999, 123)).rejects.toThrow(NotFoundException);
        });
    });
});