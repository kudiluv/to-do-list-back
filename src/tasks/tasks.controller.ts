import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { DeleteResult } from 'typeorm';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskStatusDto } from './dto/update.task.status.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({
    parameters: [
      { required: false, name: 'page', in: 'query' },
      { required: false, name: 'limit', in: 'query' },
      { required: false, name: 'sortBy', in: 'query' },
    ],
  })
  @Get()
  public findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Task>> {
    return this.tasksService.getAll(query);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        text: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  @ApiConsumes('multipart/form-data')
  @Post()
  @FormDataRequest()
  public add(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.add(createTaskDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  public delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.tasksService.delete(id);
  }

  @Put('/:id')
  public update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.tasksService.updateStatus(id, updateTaskDto);
  }
}
