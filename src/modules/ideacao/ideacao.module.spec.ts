import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ItemObra } from '../itemObra/entity/itemObra.entity';
import { Obra } from '../obra/entity/obra.entity';
import { Ideia } from './entity/ideia.entity';
import { IdeacaoController } from './ideacao.controller';
import { IdeacaoModule } from './ideacao.module';
import { IdeacaoService } from './ideacao.service';

describe('IdeacaoModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                IdeacaoModule,
            ],
        })
        .overrideModule(AuthModule)
        .useModule(class {})
        .overrideProvider(getRepositoryToken(Ideia))
        .useValue({}) 
        .overrideProvider(getRepositoryToken(Obra))
        .useValue({})
        .overrideProvider(getRepositoryToken(ItemObra))
        .useValue({})
        .compile();
    });

    it('deve estar definido', () => {
        const ideacaoModule = module.get<IdeacaoModule>(IdeacaoModule);
        expect(ideacaoModule).toBeDefined();
    });

    it('deve conter o IdeacaoService', () => {
        const service = module.get<IdeacaoService>(IdeacaoService);
        expect(service).toBeDefined();
        expect(service).toBeInstanceOf(IdeacaoService);
    });

    it('deve conter o IdeacaoController', () => {
        const controller = module.get<IdeacaoController>(IdeacaoController);
        expect(controller).toBeDefined();
        expect(controller).toBeInstanceOf(IdeacaoController);
    });
});