import { IsNotEmpty, IsNumber } from "class-validator";

export class NovaIdeiaDto {
    @IsNotEmpty({ message: 'O link não pode ser vazio' })
    link: string;
}

export class IdeiaDto extends NovaIdeiaDto {
    @IsNumber()
    id: number;
}