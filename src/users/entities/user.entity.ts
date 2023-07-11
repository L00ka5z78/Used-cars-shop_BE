import { IsEmail } from 'class-validator';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted user wit id', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated user wit id', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Removed user wit id', this.id);
  }
}
