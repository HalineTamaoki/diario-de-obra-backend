import { Test, TestingModule } from '@nestjs/testing';
import { ItemObraModule } from './itemObra.module';
import { ItemObraService } from './itemObra.service';
import { ObraService } from '../obra/obra.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ItemObra } from './entity/itemObra.entity';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../usuario/user.service';
import { AuthModule } from '../auth/auth.module';
import { ObraModule } from '../obra/obra.module';
import { Obra } from '../obra/entity/obra.entity';

describe('ItemObraModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [ItemObraModule],
        })
        .overrideModule(AuthModule)
        .useModule(class {})
        .overrideProvider(getRepositoryToken(ItemObra))
        .useValue({})
        .overrideProvider(ObraService)
        .useValue({
            validarObra: jest.fn(),
        })
        .overrideProvider(getRepositoryToken(Obra))
        .useValue({})
        .compile();
    });

    it('deve estar definido', () => {
        const itemObraModule = module.get<ItemObraModule>(ItemObraModule);
        expect(itemObraModule).toBeDefined();
    });

    it('deve prover o ItemObraService corretamente', () => {
        const service = module.get<ItemObraService>(ItemObraService);
        expect(service).toBeDefined();
    });
});