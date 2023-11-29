import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Menu } from '@/domain/menus/entities/menu.entity';

export enum ORDER_STATUS {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  tableId: string;

  @Column({ type: 'float' })
  price: number;

  @Column({
    type: 'float',
    precision: 10,
    scale: 2,
    default: 0,
  })
  reductionAmount: number;

  @Column("simple-array")
  itemsId: string[];

  @ManyToOne(() => Menu)
  @JoinColumn({ name: 'menuId' })
  menu: Menu;

  @Column()
  menuId: string;

  @Column({
    type: 'enum',
    enum: ORDER_STATUS,
    default: ORDER_STATUS.PENDING,
  })
  status: ORDER_STATUS;
}
