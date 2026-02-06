import { ItemObraDto } from "src/modules/itemObra/dto/itemObra";

export type ObraDetalhada = {
    idObra: number;
    nome: string;
    items: Pick<ItemObraDto, 'id' | 'nome' | 'ultimaEtapa'>[];
}