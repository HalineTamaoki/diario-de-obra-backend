import { IsNotEmpty, IsNumber } from "class-validator";

export class IdeiaDto {
    @IsNumber()
    @IsNotEmpty({ message: 'O id não pode ser vazio', groups: ['edit'] })
    id: number;
    
    @IsNotEmpty({ message: 'O link não pode ser vazio', groups: ['default'] })
    link: string;
}