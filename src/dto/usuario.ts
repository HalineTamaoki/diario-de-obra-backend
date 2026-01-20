import { IsEmail, IsNotEmpty, Max, MaxLength, Min, MinLength } from "class-validator";

export class Usuario {
    @IsNotEmpty({ message: 'O email não pode ser vazio', always: true })
    @IsEmail({}, { message: 'O email deve ser válido', groups: ['create'] })
    email: string;
    
    @IsNotEmpty({ message: 'A senha não pode ser vazia', always: true })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres', groups: ['create'] })
    @MaxLength(128, { message: 'A senha deve ter no máximo 128 caracteres', groups: ['create'] })
    senha: string;
}

