import { IsBoolean, IsDate, IsNotEmpty, IsNumber, MaxLength } from "class-validator";

class Orcamento {
    @IsNumber()
    @IsNotEmpty({ message: 'O id não pode ser vazio', groups: ['edit'] })
    id: number;
    
    @IsNotEmpty({ message: 'O nome do fornecedor não pode ser vazio', groups: ['default'] })
    empresa: string;

    @IsNumber()
    valor: string;
}

export class OrcamentoResumo extends Orcamento {
    selecionado: boolean;
}

export class OrcamentoDetalhes extends Orcamento {
    @IsNotEmpty({ message: 'A data não pode ser vazia', groups: ['default'] })
    @IsDate()
    data: string;

    @MaxLength(255)
    comentarios?: string;
}