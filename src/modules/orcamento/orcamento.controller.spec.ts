import { Test, TestingModule } from '@nestjs/testing';
import { Selecionar } from 'src/dto/selecionar';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrcamentoDetalhesId } from './dto/orcamento';
import { OrcamentoController } from './orcamento.controller';
import { OrcamentoService } from './orcamento.service';

describe('OrcamentoController', () => {
    let controller: OrcamentoController;
    let service: OrcamentoService;

    const mockRequest = {
        user: { id: 1 }
    } as any;

    const mockOrcamentoService = {
        get: jest.fn(),
        getDetalhes: jest.fn(),
        cadastrar: jest.fn(),
        editar: jest.fn(),
        selecionar: jest.fn(),
        deletar: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrcamentoController],
            providers: [
                {
                    provide: OrcamentoService,
                    useValue: mockOrcamentoService,
                },
            ],
        })
        .overrideGuard(JwtAuthGuard)
        .useValue({ canActivate: () => true })
        .compile();

        controller = module.get<OrcamentoController>(OrcamentoController);
        service = module.get<OrcamentoService>(OrcamentoService);
    });

    it('deve estar definido', () => {
        expect(controller).toBeDefined();
    });

    describe('get', () => {
        it('deve chamar o service.get com idItem e idUsuario corretos', async () => {
            const idItem = 10;
            await controller.get(idItem, mockRequest);
            expect(service.get).toHaveBeenCalledWith(idItem, mockRequest.user.id);
        });
    });

    describe('cadastrar', () => {
        it('deve chamar o service.cadastrar com os dados fornecidos', async () => {
            const idItem = 5;
            const dto = { valor: 100, fornecedor: 'Teste' } as any;
            await controller.cadastrar(idItem, dto, mockRequest);
            expect(service.cadastrar).toHaveBeenCalledWith(idItem, dto, mockRequest.user.id);
        });
    });

    describe('deletar', () => {
        it('deve chamar o service.deletar', async () => {
            const id = 1;
            await controller.deletar(id, mockRequest);
            expect(service.deletar).toHaveBeenCalledWith(id, mockRequest.user.id);
        });
    });

    describe("getDetalhes", () => {
        it('deve chamar o service.getDetalhes com idOrcamento convertido e idUsuario', async () => {
            const idOrcamento = 50;
            await controller.getDetalhes(idOrcamento, mockRequest);
            
            expect(service.getDetalhes).toHaveBeenCalledWith(idOrcamento, mockRequest.user.id);
        });
    });

    describe("editar", () => {
        it('deve chamar o service.editar com o corpo do orçamento e idUsuario', async () => {
            const dto: OrcamentoDetalhesId = { id: 1, valor: 500 } as any; 
            await controller.editar(dto, mockRequest);
            
            expect(service.editar).toHaveBeenCalledWith(dto, mockRequest.user.id);
        });
    });

    describe("selecionar", () => {
        it('deve chamar o service.selecionar com idOrcamento, DTO de seleção e idUsuario', async () => {
            const idOrcamento = 10;
            const dto: Selecionar = { selecionado: true } as any;
            await controller.selecionar(idOrcamento, dto, mockRequest);
            
            expect(service.selecionar).toHaveBeenCalledWith(
                idOrcamento, 
                dto, 
                mockRequest.user.id
            );
        });
    });
});