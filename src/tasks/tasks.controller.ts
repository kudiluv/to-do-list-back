import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskStatusDto } from './dto/update.task.status.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public findAll(@Paginate() query: PaginateQuery) {
    return this.tasksService.getAll(query);
  }

  @Post()
  public add(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.add(createTaskDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  public delete(@Param('id') id: number) {
    return this.tasksService.delete(id);
  }

  @Put('/:id')
  public update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskStatusDto,
  ) {
    return this.tasksService.updateStatus(id, updateTaskDto);
  }
}
