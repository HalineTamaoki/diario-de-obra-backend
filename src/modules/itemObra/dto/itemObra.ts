import { IdNome } from "../../../dto/idNome";

enum UltimaEtapa {
    IDEACAO = 1,
    ORCAMENTO = 2,
    EXECUCAO = 3,
    FINALIZACAO = 4
}

export class ItemObraDto extends IdNome {
    ultimaEtapa: UltimaEtapa;
}