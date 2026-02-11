import { ItemObra } from 'src/modules/itemObra/entity/itemObra.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('finalizacao')
export class Finalizacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz', nullable: true })
  data: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  comentarios: string;

  @Column({ name: 'item_obra_id', unique: true })
  itemObraId: number;

  @OneToOne(() => ItemObra, (itemObra) => itemObra.finalizacao, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'item_obra_id' })
  itemObra: ItemObra;
}
