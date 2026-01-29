import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { DataAdicional } from './data-adicional.entity';
import { ItemObra } from 'src/modules/itemObra/entity/itemObra.entity';

@Entity('execucao')
export class Execucao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  comentarios: string;

  @Column({ type: 'date', nullable: true })
  inicio: Date;

  @Column({ type: 'date', nullable: true })
  termino: Date;

  @Column({ name: 'item_obra_id', unique: true })
  itemObraId: number;

  @OneToOne(() => ItemObra, (itemObra) => itemObra.execucao, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'item_obra_id' })
  itemObra: ItemObra;

  @OneToMany(() => DataAdicional, (dataAdicional) => dataAdicional.execucao)
  datasAdicionais: DataAdicional[];
}
