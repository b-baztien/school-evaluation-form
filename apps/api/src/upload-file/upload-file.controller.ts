import {
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { environment } from '../environments/environment';
import { UploadFileService } from './upload-file.service';

export const editFileName = (_, file, callback) => {
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${randomName}${fileExtName}`);
};

export const imageFileFilter = (_, file, callback) => {
  if (!file.originalname.match(/\.(pdf)$/)) {
    return callback(new Error('รองรับเฉพาะไฟล์นามสกุล pdf เท่านั้น'), false);
  }
  callback(null, true);
};

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), `${environment.assetPath}`),
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  @Post('file')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file.filename;
  }

  @Get(':fileName')
  getFile(@Param('fileName') fileName: string) {
    const file = createReadStream(
      join(process.cwd(), `${environment.assetPath}/${fileName}`)
    );
    return new StreamableFile(file);
  }
}
