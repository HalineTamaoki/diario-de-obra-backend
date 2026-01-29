import { IsBoolean, IsNotEmpty } from "class-validator";

export class Selecionar {
    @IsBoolean()
    @IsNotEmpty()
    selecionar:boolean;
}