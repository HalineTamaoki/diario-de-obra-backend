import { Test, TestingModule } from '@nestjs/testing';
import { IdeacaoController } from './ideacao.controller';
import { IdeacaoService } from './ideacao.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NovaIdeiaDto } from './dto/ideacao';

describe('IdeacaoController', () => {
    let controller: IdeacaoController;
    let service: IdeacaoService;

    const mockRequest = {
        user: { id: 10 }
    } as any;

    const mockIdeacaoService = {
        get: jest.fn(),
        cadastrar: jest.fn(),
        deletar: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [IdeacaoController],
            providers: [
                {
                    provide: IdeacaoService,
                    useValue: mockIdeacaoService,
                },
            ],
        })
        .overrideGuard(JwtAuthGuard)
        .useValue({ canActivate: () => true })
        .compile();

        controller = module.get<IdeacaoController>(IdeacaoController);
        service = module.get<IdeacaoService>(IdeacaoService);
    });

    it('deve estar definido', () => {
        expect(controller).toBeDefined();
    });

    describe('get', () => {
        it('deve chamar o service.get com idItem e idUsuario corretos', async () => {
            const idItem = 1;
            await controller.get(idItem, mockRequest);
            
            expect(service.get).toHaveBeenCalledWith(idItem, mockRequest.user.id);
        });
    });

    describe('cadastrar', () => {
        it('deve chamar o service.cadastrar com idItem, DTO e idUsuario', async () => {
            const idItem = 2;
            const dto: NovaIdeiaDto = { descricao: 'Minha nova ideia' } as any;
            await controller.cadastrar(idItem, dto, mockRequest);
            
            expect(service.cadastrar).toHaveBeenCalledWith(idItem, dto, mockRequest.user.id);
        });
    });

    describe('deletar', () => {
        it('deve chamar o service.deletar com o id da ideia e idUsuario', async () => {
            const idIdeia = 99;
            await controller.deletar(idIdeia, mockRequest);
            
            expect(service.deletar).toHaveBeenCalledWith(idIdeia, mockRequest.user.id);
        });
    });
});