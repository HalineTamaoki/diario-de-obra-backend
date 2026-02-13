import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrcamentoModule } from './orcamento.module';
import { OrcamentoService } from './orcamento.service';
import { OrcamentoController } from './orcamento.controller';
import { Orcamento } from './entity/orcamento.entity';
import { AuthModule } from '../auth/auth.module';
import { ItemObra } from '../itemObra/entity/itemObra.entity';
import { Obra } from '../obra/entity/obra.entity';

describe('OrcamentoModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [OrcamentoModule],
        })
        .overrideProvider(getRepositoryToken(Orcamento))
        .useValue({})
        .overrideModule(AuthModule)
        .useModule(class {})
        .overrideProvider(getRepositoryToken(Obra))
        .useValue({})
        .overrideProvider(getRepositoryToken(ItemObra))
        .useValue({})
        .compile();
    });

    it('deve estar definido', () => {
        const orcamentoModule = module.get<OrcamentoModule>(OrcamentoModule);
        expect(orcamentoModule).toBeDefined();
    });

    it('deve prover o OrcamentoService', () => {
        const service = module.get<OrcamentoService>(OrcamentoService);
        expect(service).toBeDefined();
        expect(service).toBeInstanceOf(OrcamentoService);
    });

    it('deve possuir o OrcamentoController', () => {
        const controller = module.get<OrcamentoController>(OrcamentoController);
        expect(controller).toBeDefined();
        expect(controller).toBeInstanceOf(OrcamentoController);
    });
});