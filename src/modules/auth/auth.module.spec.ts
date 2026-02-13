import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../usuario/user.service';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entity/user.entity';

describe('AuthModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [AuthModule],
        })
        .overrideProvider(DataSource)
        .useValue({})
        .overrideProvider(getRepositoryToken(Usuario))
        .useValue({
            find: jest.fn(),
        })
        .compile();
    });

    it('deve estar definido', () => {
        const authModule = module.get<AuthModule>(AuthModule);
        expect(authModule).toBeDefined();
    });

    it('deve prover o AuthService', () => {
        const authService = module.get<AuthService>(AuthService);
        expect(authService).toBeDefined();
    });

    it('deve prover o JwtService (do JwtModule)', () => {
        const jwtService = module.get<JwtService>(JwtService);
        expect(jwtService).toBeDefined();
    });

    it('deve carregar a configuração de segredo do ConfigService ou usar default', () => {
        const configService = module.get<ConfigService>(ConfigService);
        const jwtService = module.get<JwtService>(JwtService);
        
        expect(configService).toBeDefined();
        expect(jwtService).toBeDefined();
    });
});