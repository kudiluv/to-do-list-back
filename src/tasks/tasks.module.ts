import { Module } from '@nestjs/common';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
