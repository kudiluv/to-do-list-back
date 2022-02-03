import { DynamicModule, Module } from '@nestjs/common';
import { Config } from './config';
import { FilesService } from './files.service';

@Module({})
export class FilesModule {
  static config(config: Config): DynamicModule {
    return {
      module: FilesModule,
      providers: [
        {
          provide: Config,
          useValue: config,
        },
        FilesService,
      ],
      exports: [FilesService],
    };
  }
}
