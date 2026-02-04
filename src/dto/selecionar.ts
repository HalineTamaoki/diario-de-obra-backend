import { IsBoolean, IsNotEmpty } from "class-validator";

export class Selecionar {
    @IsBoolean( { message: 'O campo selecionado deve ser um valor booleano' })
    @IsNotEmpty({ message: 'O campo selecionado não pode ser vazio' })
    selecionado:boolean;
}