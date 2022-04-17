import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FormStaff,
  FormTeacher,
  UserForm,
} from '@school-evaluation-form/api-interfaces';
import { Repository } from 'typeorm';
import { User as UserEntity } from '../user/entities/user.entity';
import { UserForm as UserFormEntity } from './entities/user-form.entity';

@Injectable()
export class UserFormService {
  constructor(
    @InjectRepository(UserFormEntity)
    private readonly userFormRepository: Repository<UserFormEntity>,
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(object: {
    username: string;
    userForm: UserForm;
    formStaff: FormStaff;
    formTeacher: FormTeacher;
  }) {
    const { username, userForm, formStaff, formTeacher } = object;

    const user = await this.userRepository.findOne({
      where: { username: username },
    });

    const dataForAdd = {
      ...userForm,
      user_Id: user._id,
      formStaff: { ...formStaff },
      formTeacher: { ...formTeacher },
    };

    return this.userFormRepository.save(dataForAdd);
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
