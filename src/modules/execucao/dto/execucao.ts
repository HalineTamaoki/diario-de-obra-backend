import { Type } from "class-transformer";
import { IsDate, IsOptional, MaxLength } from "class-validator";
import { DataAdicionalDto } from "./dataAdicional";

export class ExecucaoDto {
    @IsOptional()
    @MaxLength(255, {message: 'Os comentários não podem ultrapassar 255 caracteres'})
    comentarios: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: 'A data deve ser válida' })
    inicio: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: 'A data deve ser válida' })
    termino: Date;
}

export type ExecucaoDtoDetalhes = Partial<ExecucaoDto> & {
    itemObraId?: number;
    datasAdicionais?: DataAdicionalDto[];
}