import { IsNotEmpty, IsNumber } from "class-validator";

export class Nome {
    @IsNotEmpty({ message: 'O nome não pode ser vazio', always: true })
    nome: string;
}

export class IdNome extends Nome {
    @IsNumber({}, { message: 'O id deve ser um número', always: true})
    id: number;
}
