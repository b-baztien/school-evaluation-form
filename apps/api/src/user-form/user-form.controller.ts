import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  FormStaff,
  FormTeacher,
  UserForm,
} from '@school-evaluation-form/api-interfaces';
import { from } from 'rxjs';
import { UserFormService } from './user-form.service';

@Controller('user-form')
export class UserFormController {
  constructor(private readonly userFormService: UserFormService) {}

  @Post()
  create(@Body() userForm: UserForm) {
    return this.userFormService.create(userForm);
  }

  @Get()
  findAll() {
    return this.userFormService.findAll();
  }
}
