import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinalizacaoService } from './finalizacao.service';
import { Finalizacao } from './entity/finalizacao.entity';
import { ItemObraService } from '../itemObra/itemObra.service';
import { EtapasObra } from '../../dto/EtapasObra';

describe('FinalizacaoService', () => {
    let service: FinalizacaoService;
    let repository: Repository<Finalizacao>;
    let itemObraService: ItemObraService;

    const mockQueryBuilder = {
        select: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn(),
    };

    const mockFinalizacaoRepository = {
        createQueryBuilder: jest.fn(() => mockQueryBuilder),
        findOne: jest.fn(),
        create: jest.fn(),
        merge: jest.fn(),
        save: jest.fn(),
    };

    const mockItemObraService = {
        validarItemObra: jest.fn(),
        atualizarEtapa: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FinalizacaoService,
                {
                    provide: getRepositoryToken(Finalizacao),
                    useValue: mockFinalizacaoRepository,
                },
                {
                    provide: ItemObraService,
                    useValue: mockItemObraService,
                },
            ],
        }).compile();

        service = module.get<FinalizacaoService>(FinalizacaoService);
        repository = module.get<Repository<Finalizacao>>(getRepositoryToken(Finalizacao));
        itemObraService = module.get<ItemObraService>(ItemObraService);
    });

    describe('get', () => {
        it('deve retornar dados de finalização se encontrados', async () => {
            const mockResult = { id: 1, data: new Date(), comentarios: 'Obra concluída' };
            mockQueryBuilder.getOne.mockResolvedValue(mockResult);

            const result = await service.get(1, 123);

            expect(result).toEqual(mockResult);
            expect(mockQueryBuilder.where).toHaveBeenCalledWith('finalizacao.itemObraId = :itemObraId', { itemObraId: 1 });
        });

        it('deve retornar um objeto vazio se não houver finalização', async () => {
            mockQueryBuilder.getOne.mockResolvedValue(null);
            const result = await service.get(1, 123);
            expect(result).toEqual({});
        });
    });

    describe('editar', () => {
        it('deve criar uma nova finalização se não existir', async () => {
            const dto = { comentarios: 'Teste' };
            mockItemObraService.validarItemObra.mockResolvedValue(true);
            mockFinalizacaoRepository.findOne.mockResolvedValue(null);
            mockFinalizacaoRepository.create.mockReturnValue({ id: 1, ...dto });
            mockFinalizacaoRepository.save.mockResolvedValue({ id: 1, ...dto });

            await service.editar(10, dto, 123);

            expect(repository.create).toHaveBeenCalledWith({ ...dto, itemObraId: 10 });
            expect(repository.save).toHaveBeenCalled();
        });

        it('deve atualizar (merge) se a finalização já existir', async () => {
            const existente = { id: 1, itemObraId: 10, comentarios: 'Antigo' };
            const dto = { comentarios: 'Novo' };
            mockFinalizacaoRepository.findOne.mockResolvedValue(existente);

            await service.editar(10, dto, 123);

            expect(repository.merge).toHaveBeenCalledWith(existente, dto);
            expect(repository.save).toHaveBeenCalled();
        });
    });

    describe('editarData', () => {
        it('deve atualizar a data e mudar a etapa para FINALIZADO', async () => {
            const dto = { data: new Date() };
            const spyEditar = jest.spyOn(service, 'editar').mockResolvedValue({ id: 1, ...dto } as any);

            await service.editarData(10, dto, 123);

            expect(spyEditar).toHaveBeenCalledWith(10, { data: dto.data }, 123);
            expect(itemObraService.atualizarEtapa).toHaveBeenCalledWith(10, EtapasObra.FINALIZADO);
        });
    });

    describe('editarComentario', () => {
        it('deve chamar o método editar com o comentário formatado corretamente', async () => {
            const mockItemObraId = 10;
            const mockUsuarioId = 123;
            const dtoComentario = { comentarios: 'Obra em fase de pintura' };
            const mockFinalizacaoRetorno = { 
                id: 1, 
                comentarios: 'Obra em fase de pintura', 
                data: null 
            };

            const spyEditar = jest.spyOn(service, 'editar').mockResolvedValue(mockFinalizacaoRetorno as any);

            const result = await service.editarComentario(mockItemObraId, dtoComentario, mockUsuarioId);

            expect(spyEditar).toHaveBeenCalledWith(
                mockItemObraId, 
                { comentarios: dtoComentario.comentarios }, 
                mockUsuarioId
            );

            expect(result).toEqual(mockFinalizacaoRetorno);
        });

  });

    describe('selecionarFinalizado', () => {
        it('deve atualizar etapa para FINALIZADO quando selecionado for true', async () => {
            jest.spyOn(service, 'editar').mockResolvedValue({ id: 1 } as any);

            await service.selecionarFinalizado(10, { selecionado: true }, 123);

            expect(itemObraService.atualizarEtapa).toHaveBeenCalledWith(10, EtapasObra.FINALIZADO, false);
        });

        it('deve reverter para EXECUCAO quando selecionado for false', async () => {
            jest.spyOn(service, 'editar').mockResolvedValue({ id: 1 } as any);

            await service.selecionarFinalizado(10, { selecionado: false }, 123);

            expect(itemObraService.atualizarEtapa).toHaveBeenCalledWith(10, EtapasObra.EXECUCAO, true);
        });
    });
});