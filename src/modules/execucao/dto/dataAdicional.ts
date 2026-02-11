import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class NovaDataAdicional {
    @IsNotEmpty({ message: 'O nome não pode ser vazio'})
    nome: string;

    @IsNotEmpty({ message: 'A data não pode ser vazia'})
    @Type(() => Date)
    @IsDate({ message: 'A data deve ser válida' })
    data: Date;
}

export class DataAdicionalDto extends NovaDataAdicional {
    id: number;
}
