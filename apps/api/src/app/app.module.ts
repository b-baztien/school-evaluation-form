import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://admin:admin1234@cluster0.fqetq.mongodb.net/mydb?retryWrites=true&w=majority',
      database: 'cr-db',
      entities: [User],
      synchronize: true,
    }),
    MulterModule.register({
      dest: './assets/files',
    }),
    // AuthModule,
    UserModule,
    UploadFileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
