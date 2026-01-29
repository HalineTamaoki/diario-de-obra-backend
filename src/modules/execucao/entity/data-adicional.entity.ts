import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Execucao } from './execucao.entity';

@Entity('data_adicional')
export class DataAdicional {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nome: string;

  @Column({ type: 'date', nullable: true })
  data: Date;

  @Column({ name: 'execucao_id' })
  execucaoId: number;

  @ManyToOne(() => Execucao, (execucao) => execucao.datasAdicionais, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'execucao_id' })
  execucao: Execucao;
}
