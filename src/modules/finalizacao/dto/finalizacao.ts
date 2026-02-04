import { IsNotEmpty, MaxLength } from "class-validator";

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