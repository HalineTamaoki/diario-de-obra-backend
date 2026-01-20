import { IsNotEmpty, IsNumber } from "class-validator";

export class Obra {
    @IsNumber()
    @IsNotEmpty({ message: 'O id não pode ser vazio', groups: ['edit'] })
    id: number;

    @IsNotEmpty({ message: 'O nome não pode ser vazio', groups: ['default'] })
    nome: string;
}