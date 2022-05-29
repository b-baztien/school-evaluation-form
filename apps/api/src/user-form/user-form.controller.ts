import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserForm } from '@school-evaluation-form/api-interfaces';
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

  @Get('get-lastest')
  getLastestUserForm(@Query('userId') userId: string) {
    return this.userFormService.findLastest(userId);
  }
}
