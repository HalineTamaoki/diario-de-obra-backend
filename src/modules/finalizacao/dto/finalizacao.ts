import { IsNotEmpty, Max, MaxLength } from "class-validator";

export class FinalizacaoDto {
    id: number;
    data: Date;
    comentarios: string;
}

export class EditarComentario {
    @IsNotEmpty({ message: 'O comentário não pode ser vazio' })
    @MaxLength(255, { message: 'O comentário não pode exceder 255 caracteres' })
    comentarios: string;
}