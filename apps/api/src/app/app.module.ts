import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { environment } from '../environments/environment';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { UserForm } from '../user-form/entities/user-form.entity';
import { UserFormModule } from '../user-form/user-form.module';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: environment.type,
      url: environment.url,
      database: environment.database,
      entities: [User, UserForm],
      synchronize: true,
    }),
    MulterModule.register({
      dest: environment.assetPath,
    }),
    // AuthModule,
    UserModule,
    UserFormModule,
    UploadFileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
