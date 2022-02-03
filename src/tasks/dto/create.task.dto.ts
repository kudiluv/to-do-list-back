import {
  IsEmpty,
  isEmpty,
  IsNotEmpty,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class CreateTaskDto {
  @IsNotEmpty()
  text: string;

  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  @ValidateIf((value) => value.image && true)
  image?: MemoryStoredFile;
}
