import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@school-evaluation-form/api-interfaces';
import { from, map } from 'rxjs';
import { Repository } from 'typeorm';
import { User as UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  create(user: User) {
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findByUsername(username: string) {
    return this.userRepository.find({ where: { username: username } });
  }

  update(username: string, user: User) {
    return from(this.userRepository.update({ username: username }, user)).pipe(
      map((result) => result.raw.matchedCount > 0)
    );
  }
}
