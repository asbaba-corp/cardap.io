import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type Items = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}


@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  owner: string;

  @Column()
  name: string;
  
  @Column({
    name: "items",
    type: "jsonb",
  })
  items: Items[];

}
