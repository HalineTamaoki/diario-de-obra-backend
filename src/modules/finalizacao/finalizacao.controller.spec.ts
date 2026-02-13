import { Test, TestingModule } from '@nestjs/testing';
import { FinalizacaoController } from './finalizacao.controller';
import { FinalizacaoService } from './finalizacao.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Selecionar } from '../../dto/selecionar';
import { EditarComentario, EditarData } from './dto/finalizacao';

describe('FinalizacaoController', () => {
    let controller: FinalizacaoController;
    let service: FinalizacaoService;

    const mockRequest = {
        user: { id: 55 }
    } as any;

    const mockFinalizacaoService = {
        get: jest.fn(),
        selecionarFinalizado: jest.fn(),
        editarComentario: jest.fn(),
        editarData: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FinalizacaoController],
            providers: [
                {
                provide: FinalizacaoService,
                useValue: mockFinalizacaoService,
                },
            ],
        })
        .overrideGuard(JwtAuthGuard)
        .useValue({ canActivate: () => true })
        .compile();

        controller = module.get<FinalizacaoController>(FinalizacaoController);
        service = module.get<FinalizacaoService>(FinalizacaoService);
    });

    it('deve estar definido', () => {
        expect(controller).toBeDefined();
    });

    describe('get', () => {
        it('deve chamar o service.get com parâmetros corretos', async () => {
            const idItem = 1;
            await controller.get(idItem, mockRequest);
            expect(service.get).toHaveBeenCalledWith(idItem, mockRequest.user.id);
        });
    });

    describe('selecionarFinalizado', () => {
        it('deve chamar o service.selecionarFinalizado', async () => {
            const idItem = 2;
            const dto: Selecionar = { selecionado: true } as any;
            await controller.selecionarFinalizado(idItem, dto, mockRequest);
            expect(service.selecionarFinalizado).toHaveBeenCalledWith(idItem, dto, mockRequest.user.id);
        });
    });

    describe('editarComentario', () => {
        it('deve chamar o service.editarComentario', async () => {
            const idItem = 3;
            const dto: EditarComentario = { comentario: 'Trabalho finalizado com sucesso' } as any;
            await controller.editarComentario(idItem, dto, mockRequest);
            expect(service.editarComentario).toHaveBeenCalledWith(idItem, dto, mockRequest.user.id);
        });
    });

    describe('editarData', () => {
        it('deve chamar o service.editarData com a nova data', async () => {
            const idItem = 4;
            const dto: EditarData = { data: new Date() } as any;
            await controller.editarData(idItem, dto, mockRequest);
            expect(service.editarData).toHaveBeenCalledWith(idItem, dto, mockRequest.user.id);
        });
    });
});