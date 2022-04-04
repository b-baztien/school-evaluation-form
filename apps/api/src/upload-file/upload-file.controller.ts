import {
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { UploadFileService } from './upload-file.service';
import { diskStorage } from 'multer';

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
        destination: './assets/files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  @Post('file')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file.path;
  }

  // @Get()
  // getFile(
  //   @Res({ passthrough: true }) res: Response,
  //   @Param('filename') filename: string
  // ) {
  //   const path = join(process.cwd(), 'downloads', filename);
  //   const file = createReadStream(path);
  //   const stat = statSync(path);
  //   res.set({
  //     'Content-Type': 'application/octet-stream',
  //     'Content-Disposition': `attachment; filename="${filename}"`,
  //     'Content-length': stat.size,
  //   });
  //   return new StreamableFile(file);
  // }
}
