import { FormStaff, FormTeacher } from '@school-evaluation-form/api-interfaces';
import { Feedback } from 'libs/api-interfaces/src/lib/feedback';
import { Entity, ObjectIdColumn, ObjectID, Column, Timestamp } from 'typeorm';

@Entity()
export class UserForm {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  schoolName: string;

  @Column()
  group: string;

  @Column()
  address: string;

  @Column()
  district: string;

  @Column()
  province: string;

  @Column()
  managerName: string;

  @Column()
  startPostionYear: string;

  @Column()
  managerPhone: string;

  @Column()
  fullname: string;

  @Column()
  startYear: string;

  @Column()
  phone: string;

  @Column()
  time: string;

  @Column()
  date: Date;

  @Column()
  formTeacher?: FormTeacher[];

  @Column()
  formStaff?: FormStaff[];

  @Column()
  feedback?: Feedback;

  @Column()
  user_Id: ObjectID;

  @Column()
  username: string;

  @Column()
  updateDate?: Date;
}
