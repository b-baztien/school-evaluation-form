import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findByUsername(username: string) {
    return this.userRepository.find({ where: { username: username } });
  }

  update(username: string, updateUserDto: UpdateUserDto) {
    return from(
      this.userRepository.update({ username: username }, updateUserDto)
    ).pipe(map((result) => result.raw.matchedCount > 0));
  }
}
