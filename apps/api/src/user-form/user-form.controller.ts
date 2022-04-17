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
import { UserFormService } from './user-form.service';

@Controller('user-form')
export class UserFormController {
  constructor(private readonly userFormService: UserFormService) {}

  @Post()
  create(
    @Body()
    object: {
      username: string;
      userForm: UserForm;
      formStaff: FormStaff;
      formTeacher: FormTeacher;
    }
  ) {
    return this.userFormService.create(object);
  }

  @Get()
  findAll() {
    return this.userFormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userFormService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userForm: UserForm) {
    return this.userFormService.update(+id, userForm);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userFormService.remove(+id);
  }
}
