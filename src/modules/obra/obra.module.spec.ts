import { Test, TestingModule } from '@nestjs/testing';
import { ObraModule } from './obra.module';
import { ObraService } from './obra.service';
import { ObraController } from './obra.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Obra } from './entity/obra.entity';
import { AuthModule } from '../auth/auth.module';

describe('ObraModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                ObraModule,
            ],
        })
        .overrideModule(AuthModule)
        .useModule(class {})
        .overrideProvider(getRepositoryToken(Obra))
        .useValue({})
        .compile();
    });

    it('deve estar definido', () => {
        expect(module).toBeDefined();
    });

    it('deve resolver o ObraService', () => {
        const service = module.get<ObraService>(ObraService);
        expect(service).toBeDefined();
    });

    it('deve resolver o ObraController', () => {
        const controller = module.get<ObraController>(ObraController);
        expect(controller).toBeDefined();
    });
});