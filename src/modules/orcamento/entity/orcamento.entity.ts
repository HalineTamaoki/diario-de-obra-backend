import { ItemObra } from 'src/modules/itemObra/entity/itemObra.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('orcamento')
export class Orcamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  selecionado: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  empresa: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  valor: number;

  @Column({ type: 'timestamptz', nullable: true })
  data: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  comentarios: string;

  @Column({ name: 'item_obra_id' })
  itemObraId: number;

  @ManyToOne(() => ItemObra, (itemObra) => itemObra.orcamentos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'item_obra_id' })
  itemObra: ItemObra;
}
