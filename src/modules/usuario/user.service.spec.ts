import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from './entity/user.entity';
import { Repository } from 'typeorm';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
    compare: jest.fn(),
    hash: jest.fn(),
}));

describe('UserService', () => {
    let service: UserService;
    let repository: Repository<Usuario>;

    const mockUser = { id: 1, email: 'test@test.com', senha: 'hashedPassword' };
    const mockDto = { email: 'test@test.com', senha: 'password123' };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(Usuario),
                    useValue: {
                        exists: jest.fn(),
                        findOne: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));
    });

    describe('cadastrar', () => {
        it('deve lançar BadRequestException se o usuário já existir', async () => {
            jest.spyOn(repository, 'exists').mockResolvedValue(true);
            await expect(service.cadastrar(mockDto as any)).rejects.toThrow(BadRequestException);
        });

        it('deve criar e retornar um novo usuário com sucesso', async () => {
            jest.spyOn(repository, 'exists').mockResolvedValue(false);
            jest.spyOn(repository, 'create').mockReturnValue(mockUser as any);
            jest.spyOn(repository, 'save').mockResolvedValue(mockUser as any);

            const result = await service.cadastrar(mockDto as any);
            expect(result).toEqual({ id: 1, email: 'test@test.com' });
        });
    });

    describe('validarUsuario', () => {
        it('deve lançar UnauthorizedException se o email não for encontrado', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            await expect(service.validarUsuario(mockDto as any)).rejects.toThrow(UnauthorizedException);
        });

        it('deve retornar o ID se a senha for válida', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser as any);
            
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            const result = await service.validarUsuario(mockDto as any);
            expect(result).toBe(1);
        });

        it('deve lançar UnauthorizedException se a senha for inválida', async () => {
            const mockUser = { id: 1, email: 'test@test.com', senha: 'hashedPassword' };
            jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser as any);
            
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(service.validarUsuario({ email: 'test@test.com', senha: 'errada' } as any))
                .rejects.toThrow(UnauthorizedException);
        });
    });
});