import { Execucao } from '../../execucao/entity/execucao.entity';
import { Finalizacao } from '../../finalizacao/entity/finalizacao.entity';
import { Ideia } from '../../ideacao/entity/ideia.entity';
import { Obra } from '../../obra/entity/obra.entity';
import { Orcamento } from '../../orcamento/entity/orcamento.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('item_obra')
export class ItemObra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ name: 'ultima_etapa', type: 'integer', default: 0 })
  ultimaEtapa: number;

  @Column({ name: 'obra_id' })
  obraId: number;

  @ManyToOne(() => Obra, (obra) => obra.itensObra, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'obra_id' })
  obra: Obra;

  @OneToMany(() => Ideia, (ideia) => ideia.itemObra)
  ideias: Ideia[];

  @OneToMany(() => Orcamento, (orcamento) => orcamento.itemObra)
  orcamentos: Orcamento[];

  @OneToOne(() => Execucao, (execucao) => execucao.itemObra)
  execucao: Execucao;

  @OneToOne(() => Finalizacao, (finalizacao) => finalizacao.itemObra)
  finalizacao: Finalizacao;
}