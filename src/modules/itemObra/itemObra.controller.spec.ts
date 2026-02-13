import { Test, TestingModule } from '@nestjs/testing';
import { ItemObraController } from './itemObra.controller';
import { ItemObraService } from './itemObra.service';

describe('ItemObraController', () => {
    let controller: ItemObraController;
    let service: ItemObraService;

    const mockRequest = { user: { id: 10 } };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ItemObraController],
            providers: [
                {
                    provide: ItemObraService,
                    useValue: {
                        cadastrar: jest.fn(),
                        editar: jest.fn(),
                        deletar: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<ItemObraController>(ItemObraController);
        service = module.get<ItemObraService>(ItemObraService);
    });

    it('deve chamar cadastrar com idObra, dto e userId', async () => {
        const dto = { nome: 'Item' };
        await controller.cadastrar(1, dto, mockRequest as any);
        expect(service.cadastrar).toHaveBeenCalledWith(1, dto, 10);
    });

    it('deve chamar editar', async () => {
        const dto = {id: 1, nome: 'nome'};
        await controller.editar(dto, mockRequest as any);
        expect(service.editar).toHaveBeenCalledWith(dto, 10);
    });

    it('deve chamar deletar com id e userId', async () => {
        await controller.deletar(100, mockRequest as any);
        expect(service.deletar).toHaveBeenCalledWith(100, 10);
    });
});