import { IsNotEmpty } from "class-validator";

export class Usuario {
    @IsNotEmpty({ message: 'O usuário não pode ser vazio' })
    usuario: string;
    
    @IsNotEmpty({ message: 'O usuário não pode ser vazio' })
    senha: string;
}