import { Injectable } from '@nestjs/common';
import { UserForm } from '@school-evaluation-form/api-interfaces';

@Injectable()
export class UserFormService {
  create(userForm: UserForm) {
    return 'This action adds a new userForm';
  }

  findAll() {
    return `This action returns all userForm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userForm`;
  }

  update(id: number, userForm: UserForm) {
    return `This action updates a #${id} userForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} userForm`;
  }
}
