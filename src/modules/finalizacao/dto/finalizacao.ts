import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, MaxLength } from "class-validator";

export type FinalizacaoType = {
    id: number;
    data: Date;
    comentarios: string;
}

export class EditarComentario {
    @IsNotEmpty({ message: 'O comentário não pode ser vazio' })
    @MaxLength(255, { message: 'O comentário não pode exceder 255 caracteres' })
    comentarios: string;
}

export class EditarData {
    @IsNotEmpty({ message: 'A data não pode ser vazia' })
    @Type(() => Date)
    @IsDate({ message: 'A data deve ser válida' })
    data: Date;
}