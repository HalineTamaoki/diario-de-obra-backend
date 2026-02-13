import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExecucaoModule } from './execucao.module';
import { ExecucaoService } from './execucao.service';
import { ExecucaoController } from './execucao.controller';
import { Execucao } from './entity/execucao.entity';
import { DataAdicional } from './entity/data-adicional.entity';
import { AuthModule } from '../auth/auth.module';
import { ItemObra } from '../itemObra/entity/itemObra.entity';
import { Obra } from '../obra/entity/obra.entity';

describe('ExecucaoModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [ExecucaoModule],
        })
        .overrideProvider(getRepositoryToken(Execucao))
        .useValue({})
        .overrideProvider(getRepositoryToken(DataAdicional))
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
        const execucaoModule = module.get<ExecucaoModule>(ExecucaoModule);
        expect(execucaoModule).toBeDefined();
    });

    it('deve instanciar o ExecucaoService corretamente', () => {
        const service = module.get<ExecucaoService>(ExecucaoService);
        expect(service).toBeDefined();
        expect(service).toBeInstanceOf(ExecucaoService);
    });

    it('deve instanciar o ExecucaoController corretamente', () => {
        const controller = module.get<ExecucaoController>(ExecucaoController);
        expect(controller).toBeDefined();
        expect(controller).toBeInstanceOf(ExecucaoController);
    });
});