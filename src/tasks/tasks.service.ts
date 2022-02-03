import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskStatusDto } from './dto/update.task.status.dto';
import { Task } from './tasks.model';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private filesService: FilesService,
  ) {}
  async getAll(query: PaginateQuery): Promise<Paginated<Task>> {
    return await paginate(query, this.taskRepository, {
      searchableColumns: ['id'],
      sortableColumns: ['id'],
    });
  }
  async findById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ id });
    if (!task) {
      throw new HttpException('The task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async add(createTaskDto: CreateTaskDto): Promise<Task> {
    const imgField = createTaskDto.image
      ? 'images/' + (await this.filesService.save(createTaskDto.image)).fileName
      : null;
    const task = await this.taskRepository.save({
      text: createTaskDto.text,
      img: imgField,
    });
    return task;
  }
  async updateStatus(
    id: number,
    updateTaskDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    await this.taskRepository.update({ id: id }, updateTaskDto);
    return await this.findById(id);
  }
  async delete(id: number): Promise<DeleteResult> {
    const task = await this.findById(id);
    return await this.taskRepository.delete({ id: task.id });
  }
}
