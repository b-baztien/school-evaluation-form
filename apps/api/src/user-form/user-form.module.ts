import { Module } from '@nestjs/common';
import { UserFormService } from './user-form.service';
import { UserFormController } from './user-form.controller';

@Module({
  controllers: [UserFormController],
  providers: [UserFormService]
})
export class UserFormModule {}
