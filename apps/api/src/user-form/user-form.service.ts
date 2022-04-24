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

  async create(userForm: UserForm) {
    const user = await this.userRepository.findOne({
      where: { username: userForm.username },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const dataForAdd = {
      ...userForm,
      user_Id: user._id,
    } as UserForm;

    return this.userFormRepository.save(dataForAdd);
  }

  findAll() {
    return this.userFormRepository.find();
  }
}
