import { IsEmail } from 'class-validator';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Report } from '../../reports/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

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
