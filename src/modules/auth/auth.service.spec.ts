import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../usuario/user.service';
import { UsuarioDto } from '../../dto/usuario';

describe('AuthService', () => {
    let service: AuthService;
    let userService: UserService;
    let jwtService: JwtService;

    const mockUserDto: UsuarioDto = { email: 'test@example.com', senha: 'password123' } as any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: {
                        validarUsuario: jest.fn().mockResolvedValue(1), 
                    },
                },
                {
                provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('mock_access_token'),
                        decode: jest.fn().mockReturnValue({ exp: 1700000000 }), // Mock da expiração
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('deve estar definido', () => {
        expect(service).toBeDefined();
    });

    it('deve retornar um access_token e a data de expiração ao fazer login', async () => {
        const result = await service.login(mockUserDto);

        expect(userService.validarUsuario).toHaveBeenCalledWith(mockUserDto);
        expect(jwtService.sign).toHaveBeenCalled();
        expect(result).toHaveProperty('access_token', 'mock_access_token');
        expect(result).toHaveProperty('validTo');
        expect(typeof result.validTo).toBe('string');
    });
});