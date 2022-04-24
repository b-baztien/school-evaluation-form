import { FormStaff } from './form-staff';
import { FormTeacher } from './form-teacher';

export interface UserForm {
  schoolName: string;
  group: string;
  address: string;
  district: string;
  province: string;
  managerName: string;
  startPostionYear: string;
  managerPhone: string;
  fullname: string;
  startYear: string;
  phone: string;
  time: string;
  date: Date;
  formStaff?: FormStaff[];
  formTeacher?: FormTeacher[];
  fileName: string;
  username: string;
}
