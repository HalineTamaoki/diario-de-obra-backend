import { Test, TestingModule } from '@nestjs/testing';
import { ObraController } from './obra.controller';
import { ObraService } from './obra.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('ObraController', () => {
    let controller: ObraController;
    let service: ObraService;

    const mockRequest = {
        user: { id: 10 }
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ObraController],
            providers: [
                {
                    provide: ObraService,
                    useValue: {
                        get: jest.fn().mockResolvedValue([]),
                        getById: jest.fn().mockResolvedValue({}),
                        cadastrar: jest.fn().mockResolvedValue({ id: 1 }),
                        editar: jest.fn().mockResolvedValue({ id: 1 }),
                        deletar: jest.fn().mockResolvedValue(undefined),
                    },
                },
            ],
        })
        .overrideGuard(JwtAuthGuard)
        .useValue({ canActivate: () => true })
        .compile();

        controller = module.get<ObraController>(ObraController);
        service = module.get<ObraService>(ObraService);
    });

    it('deve chamar o service.get com o ID do usuário do token', async () => {
        await controller.get(mockRequest as any);
        expect(service.get).toHaveBeenCalledWith(10);
    });

    it('deve chamar o service.cadastrar com os dados corretos', async () => {
        const dto = { nome: 'Obra Teste' };
        await controller.cadastrar(dto, mockRequest as any);
        expect(service.cadastrar).toHaveBeenCalledWith(dto, 10);
    });

    it('deve chamar o service.deletar com o ID da rota e o ID do usuário', async () => {
        await controller.deletar(1, mockRequest as any);
        expect(service.deletar).toHaveBeenCalledWith(1, 10);
    });
});