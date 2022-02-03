import { Module } from '@nestjs/common';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { FilesModule } from 'src/files/files.module';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    FilesModule.config({ path: 'public/images' }),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
