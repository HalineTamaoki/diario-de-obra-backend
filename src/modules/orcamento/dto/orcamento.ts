import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, Max, MaxLength, Min } from "class-validator";

class Orcamento {   
    @IsNotEmpty({ message: 'O nome do fornecedor não pode ser vazio' })
    empresa: string;

    @IsOptional()
    @Type(() => Number) 
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O valor deve ter no máximo 2 casas decimais' }) 
    @Min(0.01, { message: 'O valor deve ser maior que 0' }) 
    @Max(999999.99, { message: 'O valor não pode ultrapassar 999999.99' })
    valor: number;
}

export class OrcamentoResumo extends Orcamento {
    selecionado: boolean;
}

export class OrcamentoDetalhes extends Orcamento {
    @IsNotEmpty({ message: 'A data não pode ser vazia' })
    @Type(() => Date)
    @IsDate({ message: 'A data deve ser válida' })
    data: Date;

    @IsOptional()
    @MaxLength(255, {message: 'Os comentários não podem ultrapassar 255 caracteres'})
    comentarios?: string;
}

export class OrcamentoDetalhesId extends OrcamentoDetalhes {
    @IsNumber()
    @IsNotEmpty({ message: 'O id não pode ser vazio' })
    id: number;
}