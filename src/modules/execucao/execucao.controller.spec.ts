import { Test, TestingModule } from '@nestjs/testing';
import { ExecucaoController } from './execucao.controller';
import { ExecucaoService } from './execucao.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NovaDataAdicional } from './dto/dataAdicional';
import { ExecucaoDto } from './dto/execucao';

describe('ExecucaoController', () => {
    let controller: ExecucaoController;
    let service: ExecucaoService;

    const mockRequest = {
        user: { id: 1 }
    } as any;

    const mockExecucaoService = {
        get: jest.fn(),
        cadastrarDataAdicional: jest.fn(),
        editar: jest.fn(),
        editarDataAdicional: jest.fn(),
        deletarDataAdicional: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ExecucaoController],
            providers: [
                {
                provide: ExecucaoService,
                useValue: mockExecucaoService,
                },
            ],
        })
        .overrideGuard(JwtAuthGuard)
        .useValue({ canActivate: () => true })
        .compile();

        controller = module.get<ExecucaoController>(ExecucaoController);
        service = module.get<ExecucaoService>(ExecucaoService);
    });

    it('deve estar definido', () => {
        expect(controller).toBeDefined();
    });

    describe('get', () => {
        it('deve chamar o service.get com idItem e idUsuario', async () => {
            const idItem = 10;
            await controller.get(idItem, mockRequest);
            expect(service.get).toHaveBeenCalledWith(idItem, mockRequest.user.id);
        });
    });

    describe('cadastrarDataAdicional', () => {
        it('deve chamar o service.cadastrarDataAdicional com DTO correto', async () => {
            const idItem = 20;
            const dto: NovaDataAdicional = { data: new Date() } as any;
            await controller.cadastrarDataAdicional(idItem, dto, mockRequest);
            expect(service.cadastrarDataAdicional).toHaveBeenCalledWith(idItem, dto, mockRequest.user.id);
        });
    });

    describe('editar', () => {
        it('deve chamar o service.editar para a execução principal', async () => {
            const idItem = 30;
            const dto: ExecucaoDto = { status: 'concluido' } as any;
            await controller.editar(idItem, dto, mockRequest);
            expect(service.editar).toHaveBeenCalledWith(idItem, dto, mockRequest.user.id);
        });
    });

    describe('editarDataAdicional', () => {
        it('deve chamar o service.editarDataAdicional com o id da data', async () => {
            const idData = 5;
            const dto: NovaDataAdicional = { data: new Date() } as any;
            await controller.editarDataAdicional(idData, dto, mockRequest);
            expect(service.editarDataAdicional).toHaveBeenCalledWith(idData, dto, mockRequest.user.id);
        });
    });

    describe('deletarDataAdicional', () => {
        it('deve chamar o service.deletarDataAdicional', async () => {
            const idData = 50;
            await controller.deletarDataAdicional(idData, mockRequest);
            expect(service.deletarDataAdicional).toHaveBeenCalledWith(idData, mockRequest.user.id);
        });
    });
});