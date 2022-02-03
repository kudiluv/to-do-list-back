import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { MemoryStoredFile } from 'nestjs-form-data';
import { promises as fs } from 'fs';
import * as path from 'path';
import { Config } from './config';
import { Savedfile } from './types/saved.file';

@Injectable()
export class FilesService {
  constructor(private config: Config) {}

  async save(file: MemoryStoredFile): Promise<Savedfile> {
    const fileName = `${nanoid()}${path.extname(file.originalName)}`;
    const filePath = `${this.config.path}/${fileName}`;
    await fs.writeFile(filePath, file.buffer);
    return {
      fileName,
      filePath,
    };
  }
}
