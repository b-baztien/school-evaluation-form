import { Module } from '@nestjs/common';
import { UserFormService } from './user-form.service';
import { UserFormController } from './user-form.controller';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserForm } from './entities/user-form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserForm, User])],
  controllers: [UserFormController],
  providers: [UserFormService, UserService],
})
export class UserFormModule {}
