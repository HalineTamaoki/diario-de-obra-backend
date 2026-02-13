import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuarioDto } from '../../dto/usuario';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockLoginResponse = {
    access_token: 'valid_token',
    validTo: '2026-02-12T00:00:00.000Z',
  };

  const mockUserDto: UsuarioDto = { email: 'test@test.com', senha: '123' } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(mockLoginResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o authService.login e retornar os dados do token', async () => {
    const result = await controller.login(mockUserDto);

    expect(authService.login).toHaveBeenCalledWith(mockUserDto);
    expect(result).toEqual(mockLoginResponse);
  });
});