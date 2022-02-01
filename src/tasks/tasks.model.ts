import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TaskStatus } from './tasks.status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ default: TaskStatus.WAITING })
  status: TaskStatus;
}
