import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FinalizacaoModule } from './finalizacao.module';
import { FinalizacaoService } from './finalizacao.service';
import { FinalizacaoController } from './finalizacao.controller';
import { Finalizacao } from './entity/finalizacao.entity';
import { AuthModule } from '../auth/auth.module';
import { ItemObra } from '../itemObra/entity/itemObra.entity';
import { Obra } from '../obra/entity/obra.entity';

describe('FinalizacaoModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                FinalizacaoModule,
            ],
        })
        .overrideProvider(getRepositoryToken(Finalizacao))
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
        const finalizacaoModule = module.get<FinalizacaoModule>(FinalizacaoModule);
        expect(finalizacaoModule).toBeDefined();
    });

    it('deve prover o FinalizacaoService', () => {
        const service = module.get<FinalizacaoService>(FinalizacaoService);
        expect(service).toBeDefined();
        expect(service).toBeInstanceOf(FinalizacaoService);
    });

    it('deve possuir o FinalizacaoController', () => {
        const controller = module.get<FinalizacaoController>(FinalizacaoController);
        expect(controller).toBeDefined();
        expect(controller).toBeInstanceOf(FinalizacaoController);
    });
});