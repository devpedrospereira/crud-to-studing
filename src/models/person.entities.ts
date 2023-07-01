/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PersonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string;
  
  @Column('int')
  age: number;
  
  @Column()
  document: string;
}
