import { Test, TestingModule } from '@nestjs/testing';
import { UserFormController } from './user-form.controller';
import { UserFormService } from './user-form.service';

describe('UserFormController', () => {
  let controller: UserFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFormController],
      providers: [UserFormService],
    }).compile();

    controller = module.get<UserFormController>(UserFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
