import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from '@school-evaluation-form/api-interfaces';
import { from, map, tap } from 'rxjs';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() user: User) {
    return from(this.userService.findByUsername(user.username)).pipe(
      map((result) => result[0]),
      tap((result) => {
        const userResult = (result ?? {}) as User;
        if (
          userResult.username !== user.username ||
          userResult.password !== user.password
        ) {
          throw new HttpException(
            'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
            HttpStatus.UNAUTHORIZED
          );
        }
      })
    );
  }

  @Get('generate') generateUser() {
    const staffs = [
      'นายเอกฐสิทธิ์ กอบกํา',
      'นางสาววัชรี เหล่มตระกูล',
      'นางสาวอัญชลี โทกุล',
      'นายนพดล ถาวร',
      'นายชัยวุฒิ นามะกุณา',
      'นางเขมจิรา เศวตรัตนเสถียร',
      'นางอัมรินทร์ บุญเอนก',
      'นางสาววิมล ปวนปันวงค์',
      'นางทานตะวัน มะโนพงศ์พันธ์',
      'นายสวัสดิ์ ละคําปา',
      'นางพรนิภา ยศบุญเรือง',
      'นางสาวยุวธิดา ใหม่กันทะ',
      'นางกนิษฐา สวยสด',
      'นางศรีจันทร์ ทรายใจ',
    ];

    const teachers = [
      52010120, 52010121, 52010130, 52010131, 52010145, 52010149, 52010153,
      52010164, 52010169, 52010184, 52010185, 52010189, 52010128, 52010021,
      52010023, 52010024, 52010029, 52010031, 52010088, 52010089, 52010005,
      52010006, 52010012, 52010079, 52010052, 52010054, 52010055, 52010056,
      52010059, 52010060, 52010061, 52010063, 52010071, 52010072, 52010124,
      52010125, 52010134, 52010135, 52010138, 52010140, 52010155, 52010157,
      52010159, 52010162, 52010163, 52010001, 52010002, 52010009, 52010084,
      52010170, 52010171, 52010173, 52010177, 52010178, 52010034, 52010043,
      52010044, 52010045, 52010046, 52010051, 52010065, 52010066, 52010069,
      52010070, 52010101, 52010105, 52010106, 52010107, 52010109, 52010110,
      52010113, 52010114, 52010116, 52010090, 52010091, 52010092, 52010093,
      52010095, 52010098, 52010099, 52010100, 52010182, 52010190, 52010194,
      52010195, 52010196,
    ];

    for (const index in staffs) {
      const user: User = {
        username: index.padStart(3, '0'),
        password: index.padStart(3, '0'),
        role: 'staff',
      };
      this.userService.create(user);
    }

    for (const item of teachers) {
      const user: User = {
        username: item.toString(),
        password: item.toString(),
        role: 'teacher',
      };
      this.userService.create(user);
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Patch(':username')
  update(@Param('username') username: string, @Body() user: User) {
    return this.userService.update(username, user);
  }
}
