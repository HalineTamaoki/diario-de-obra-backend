import { IsBoolean, IsNotEmpty } from "class-validator";

export class Selecionar {
    @IsBoolean({ always: true })
    @IsNotEmpty({ message: 'O campo selecionado não pode ser vazio', always: true })
    selecionado:boolean;
}