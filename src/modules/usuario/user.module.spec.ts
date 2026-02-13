import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from './user.module';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from './entity/user.entity';
import { DataSource } from 'typeorm';

describe('UserModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [UserModule],
        })
        .overrideProvider(DataSource)
        .useValue({})
        .overrideProvider(getRepositoryToken(Usuario))
        .useValue({
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
        })
        .compile();
    });

    it('deve estar definido', () => {
        const userModule = module.get<UserModule>(UserModule);
        expect(userModule).toBeDefined();
    });

    it('deve prover o UserService', () => {
        const userService = module.get<UserService>(UserService);
        expect(userService).toBeDefined();
    });
});