import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
    let controller: UserController;
    let service: UserService;

    const mockResponse = { id: 1, email: 'test@test.com' };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        cadastrar: jest.fn().mockResolvedValue(mockResponse),
                    },
                },
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });

    it('deve chamar o método cadastrar do serviço com os dados corretos', async () => {
        const dto = { email: 'test@test.com', senha: '123' };
        const result = await controller.cadastrar(dto as any);

        expect(service.cadastrar).toHaveBeenCalledWith(dto);
        expect(result).toEqual(mockResponse);
    });
});