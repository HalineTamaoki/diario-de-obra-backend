import { IsDate, IsNumber } from "class-validator";
import { DataAdicionalDto } from "./dataAdicional";

export class ExecucaoDto {
    @IsNumber()
    id: number;

    comentarios: string;

    @IsDate()
    inicio: Date;

    @IsDate()
    termino: Date;
}

export class ExecucaoDtoDetalhes extends ExecucaoDto {
    itemObraId: number;
    datasAdicionais: DataAdicionalDto[];
}