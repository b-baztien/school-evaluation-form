import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';

@Controller('download/:filename')
export class DownloadController {
  @Get()
  getFile(
    @Res({ passthrough: true }) res: Response,
    @Param('filename') filename: string
  ) {
    const path = join(process.cwd(), 'downloads', filename);
    const file = createReadStream(path);
    const stat = statSync(path);
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-length': stat.size,
    });
    return new StreamableFile(file);
  }
}
