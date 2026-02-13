import { ItemObra } from '../../itemObra/entity/itemObra.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('ideia')
export class Ideia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  link: string;

  @Column({ name: 'item_obra_id' })
  itemObraId: number;

  @ManyToOne(() => ItemObra, (itemObra) => itemObra.ideias, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'item_obra_id' })
  itemObra: ItemObra;
}
