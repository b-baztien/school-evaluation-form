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
  private operationType = ['ควรปรับปรุง/แก้ไข', 'พอใช้', 'ดี', 'ดีมาก'];

  constructor(
    @InjectRepository(UserFormEntity)
    private readonly userFormRepository: Repository<UserFormEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(userForm: UserForm) {
    const user = await this.userRepository.findOne({
      where: { username: userForm.username },
    });

    if (!user) {
      throw new Error('User not found');
    }

    for (const formStaff of userForm.formStaff) {
      for (const tableBody of formStaff.tableBody) {
        for (const tableInside of tableBody.tableInside) {
          tableInside.totalScore = tableBody.tableInside.reduce((acc, _) => {
            return acc + 4;
          }, 0);

          tableInside.score = tableInside.tablePerformance
            .map((item) => {
              return this.operationType.indexOf(item.selectOption) + 1;
            })
            .reduce((acc, curr) => {
              return acc + curr;
            }, 0);
        }

        tableBody.totalScore = tableBody.tableInside.reduce((acc, curr) => {
          return acc + curr.score;
        }, 0);
      }
    }

    const dataForAdd = {
      ...userForm,
      updateDate: new Date(),
      user_Id: user._id,
    } as UserForm;

    return this.userFormRepository.save(dataForAdd);
  }

  findAll() {
    return this.userFormRepository.find();
  }

  async findLastest(userId: string) {
    const user = await this.userRepository.findOne({
      where: { username: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return this.userFormRepository.findOne({
      where: { user_Id: user._id },
      order: {
        updateDate: 'DESC',
      },
    });
  }
}
