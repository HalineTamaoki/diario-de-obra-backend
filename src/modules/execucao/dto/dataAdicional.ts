import { IsDate, IsNotEmpty } from "class-validator";

export class DataAdicionalDto    {
    id: number;
    
    @IsNotEmpty({ message: 'O nome não pode ser vazio', groups: ['default'] })
    nome: string;

    @IsDate()
    @IsNotEmpty({ message: 'A data não pode ser vazia', groups: ['default'] })
    data: Date;
}