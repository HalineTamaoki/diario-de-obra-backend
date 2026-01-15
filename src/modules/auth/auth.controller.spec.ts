import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should call authService.login with the provided usuario and return the result', async () => {
      const usuario = { username: 'testuser', password: 'testpass' };
      const loginResult = { access_token: 'jwt-token' };
      (authService.login as jest.Mock).mockResolvedValue(loginResult);

      const result = await authController.login(usuario as any);

      expect(authService.login).toHaveBeenCalledWith(usuario);
      expect(result).toEqual(loginResult);
    });
  });
});
