import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormStaff, UserForm } from '@school-evaluation-form/api-interfaces';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { FormService } from 'apps/evaluation-form/src/services/form/form.service';
import { RootStoreService } from 'apps/evaluation-form/src/services/root-store/root-store.service';
import { CustomValidator } from 'apps/evaluation-form/src/utils/validatates/form-validatate';
import { Feedback } from 'libs/api-interfaces/src/lib/feedback';
import { MessageService } from 'primeng/api';
import { first, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'school-evaluation-form-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form1Component {
  operationType = ['ควรปรับปรุง/แก้ไข', 'พอใช้', 'ดี', 'ดีมาก'];

  dataTable: FormStaff[] = [
    {
      tableHeader: 'ด้านที่ 1 ด้านการบริหารจัดการสถานศึกษา',
      tableBody: [
        {
          tableMainHeading:
            'ด้านที่ 1 ด้านการบริหารจัดการสถานศึกษา (4 องค์ประกอบ 14 ตัวบ่งชี้ )',
          tableInside: [
            {
              tableHeading: 'องค์ประกอบ 1 นโยบาย',
              tablePerformance: [
                {
                  topic:
                    'ตัวบ่งชี้ที่ 1.1มีนโยบายน้อมนำหลักปรัชญาของ เศรษฐกิจพอเพียงมาขับเคลื่อนในสถานศึกษา และบูรณาการในแผนปฏิบัติงานประจำปี',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 1.2 ดำเนินการตา มนโยบายและแผนปฏิบัติงานประจำปี ที่น้อมนำ หลักปรัชญาของ เศรษฐกิจพอเพียงมาขับเคลื่อนในสถานศึกษา',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 1.3 ติดตามผลการดำเนินการตามนโยบายและแผนปฏิบัติ งานประจำปีที่น้อมนำหลัก ปรัชญาของเศรษฐกิจพอเพียงมาขับเคลื่อนในสถานศึกษา',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 1.4 นำผลการติดตามมาพัฒนา นโยบาย/แผนงาน /โครงการ /กิจกรรม ขับเคลื่อน หลัก ปรัชญาของเศรษฐกิจพอเพียงในสถานศึกษา',
                  selectOption: '',
                },
              ],

              totalDetail: '',
            },
            {
              tableHeading: 'องค์ประกอบ 2 วิชาการ',
              tablePerformance: [
                {
                  topic:
                    'ตัวบ่งชี้ที่ 2.1 มีแผนงาน/โครงการ/กิจกรรม ด้านวิชาการที่ส่งเสริมการบูรณาการหลักปรัชญาของเศรษฐกิจพอเพียงสู่การจัดกิจกรรม การเรียนรู้',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 2.2 ดำเนินการตาม แผนงาน/โครงการ/กิจกรรม ด้านวิชาการที่ส่งเสริมการบูรณาการหลักปรัชญาของเศรษฐกิจพอเพียงสู่การ จัดกิจกรรมการเรียนรู้',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 2.3 ติดตามผลการดำเนินการตาม แผนงาน/โครงการ/กิจกรรม ด้านวิชาการที่ส่งเสริมการบูรณาการหลักปรัชญาของเศรษฐกิจพอเพียงสู่การจัดกิจกรรมการเรียนรู้',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 2.4 นำผลการติดตามไปพัฒนา แผนงาน/โครงการ/กิจกรรม ด้านวิชาการที่ส่งเสริมการบูรณาการหลักปรัชญาของเศรษฐกิจพอเพียงสู่การจัดกิจกรรมการเรียนรู้',
                  selectOption: '',
                },
              ],

              totalDetail: '',
            },
            {
              tableHeading: 'องค์ประกอบ 3 งบประมาณ',
              tablePerformance: [
                {
                  topic:
                    'ตัวบ่งชี้ที่ 3.1 มีการวางแผนการบริหารจัดการงบประมาณของสถานศึกษาที่สอดคล้องกับหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 3.2 ดำเนินการตามแผนงบประมาณของสถานศึกษาตามหลักปรัชญา ของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 3.3 ติดตามผลการดำเนินงานตามแผนงบประมาณของสถานศึกษา ตามหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 3.4 นำผลการติดตามมาพัฒนาและปรับปรุง การบริหารจัดการ งบประมาณตามหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
              ],

              totalDetail: '',
            },
            {
              tableHeading: 'องค์ประกอบ 4 บริหารงานทั่วไป',
              tablePerformance: [
                {
                  topic:
                    'ตัวบ่งชี้ที่ 4.1 บริหารอาคารสถานที่และจัดการแหล่งการเรียนรู้ในสถานศึกษา ตามหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 4.2 ประสานสัมพันธ์กับชุมชนให้มีส่วนร่วมในการจัดกิจกรรมการ เรียนรู้เพื่อเสริมสร้างคุณลักษณะอยู่อย่างพอเพียงของผู้เรียน',
                  selectOption: '',
                },
              ],

              totalDetail: '',
            },
          ],

          totalDetail: '',
        },
        {
          tableMainHeading:
            ' ด้านที่ 2 ด้านหลักสูตรและการจัดกิจกรรมการเรียนรู้ (4 องค์ประกอบ 14 ตัวบ่งชี้ ) ',
          tableInside: [
            {
              tableHeading:
                'องค์ประกอบ 1 หน่วยการเรียนรู้ปรัชญาของเศรษฐกิจพอเพียง',
              tablePerformance: [
                {
                  topic:
                    'ตัวบ่งชี้ที่ 1.1 มีหน่วยการเรียนรู้ปรัชญาของเศรษฐกิจพอเพียง ตามมาตรฐาน การเรียนรู้',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 1.2 มีการนิเทศ/ติดตาม/ประเมินผล การนำหน่วยการเรียนรู้ปรัชญา ของเศรษฐกิจพอเพียงไปใช้ในการจัดกิจกรรมการเรียนรู้',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 1.3 มีการศึกษา/วิเคราะห์/วิจัย เพื่อพัฒนาการจัดกิจกรรมการเรียนรู้หน่วยการเรียนรู้ปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
              ],

              totalDetail: '',
            },
            {
              tableHeading:
                'องค์ประกอบ 2 การบูรณาการหลัก ปรัชญาของ เศรษฐกิจพอเพียงสู่การจัดกิจกรรมการเรียนรู้',
              tablePerformance: [
                {
                  topic:
                    'ตัวบ่งชี้ที่ 2.1 มีแผนจัดการเรียนรู้ที่บูรณาการหลักปรัชญาของเศรษฐกิจพอเพียงในกลุ่มสาระการเรียนรู้ต่าง ๆ ตามมาตรฐานการเรียนรู้',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 2.2 คุณภาพของแผนจัดการเรียนรู้ที่บูรณาการหลักปรัชญาของ เศรษฐกิจพอเพียงในกลุ่มสาระการเรียนรู้ต่างๆ',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 2.3 จัดกิจกรรมการเรียนรู้ที่บูรณาการหลักปรัชญาของเศรษฐกิจ พอเพียงในกลุ่มสาระการเรียนรู้ต่างๆ',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 2.4 ผู้เรียนมีส่วนร่วมในการจัดกิจกรรมการเรียนรู้ที่บูรณาการหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
              ],

              totalDetail: '',
            },
            {
              tableHeading:
                'องค์ประกอบ 3 สื่อและแหล่ง เรียนรู้เกี่ยวกับ หลักปรัชญา ของเศรษฐกิจ พอเพียง',
              tablePerformance: [
                {
                  topic:
                    'ตัวบ่งชี้ที่ 3.1 จัดหา/ผลิต/ใช้/เผยแพร่ สื่อการเรียนรู้ เพื่อบูรณาการหลักปรัชญาของเศรษฐกิจพอเพียงในการจัดกิจกรรมการเรียนรู้',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 3.2 จัดทำ/พัฒนา/เผยแพร่ แหล่งเรียนรู้ในสถานศึกษาเพื่อสนับสนุน การเรียนรู้ เกี่ยวกับหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 3.3 ใช้แหล่งเรียนรู้/ภูมิปัญญาท้องถิ่นในชุมชนที่เสริมสร้างการ พัฒนาคุณลักษณะอยู่อย่างพอเพียงของผู้เรียน',
                  selectOption: '',
                },
              ],

              totalDetail: '',
            },
            {
              tableHeading:
                'องค์ประกอบ 4 การวัดและประเมินผลการจัดกิจกรรมการเรียนรู้ตามหลักปรัชญาของเศรษฐกิจพอเพียง',
              tablePerformance: [
                {
                  topic:
                    'ตัวบ่งชี้ที่ 4.1 จัดทำเครื่องมือวัดผลและประเมินผลที่หลากหลาย และสอดคล้องกับวัตถุประสงค์ของการจัดกิจกรรมการเรียนรู้ตามหลักปรัชญา ของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 4.2 ใช้วิธีการวัดผลและประเมินผลที่หลากหลาย และสอดคล้องกับการจัดกิจกรรมการเรียนรู้ที่บูรณาการหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 4.3 รายงานผลการประเมิน และน ามาปรับปรุง/พัฒนา การจัด กิจกรรมการเรียนรู้ที่บูรณาการหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 4.4 จัดแสดง/เผยแพร่/ประกวด/แลกเปลี่ยนเรียนรู้ ผลงานของผู้เรียน ที่เกิดจากการนำหลักปรัชญาของเศรษฐกิจพอเพียงไปประยุกต์ใช้',
                  selectOption: '',
                },
              ],

              totalDetail: '',
            },
          ],

          totalDetail: '',
        },
        {
          tableMainHeading:
            ' ด้านที่ 3 ด้านการจัดกิจกรรมพัฒนาผู้เรียน (3 องค์ประกอบ 15 ตัวบ่งชี้) ',
          tableInside: [
            {
              tableHeading:
                'องค์ประกอบ 1 การแนะแนวและระบบดูแลช่วยเหลือผู้เรียน',
              tablePerformance: [
                {
                  topic:
                    'ตัวบ่งชี้ที่ 1.1 มีแผนงานแนะแนว เพื่อสนับสนุนการดำเนินชีวิตที่สอดคล้องกับหลักปรัชญาของ เศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 1.2 จัดกิจกรรมแนะแนวให้ผู้เรียนได้รู้จักการวางแผนชีวิตของตนเอง ได้อย่างสอดคล้องกับ หลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 1.3 มีระบบดูแลช่วยเหลือผู้เรียนให้สามารถ แก้ปัญหาและพัฒนาตนเอง ได้อย่างสอดคล้อง กับหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 1.4 ติดตามผล การจัดกิจกรรมแนะแนว และระบบดูแลช่วยเหลือผู้เรียนตามหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 1.5 นำผลการติดตามมาใช้พัฒนาการจัดกิจกรรม แนะแนว และระบบดูแลช่วยเหลือผู้เรียน ตามหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
              ],

              totalDetail: '',
            },
            {
              tableHeading: 'องค์ประกอบ 2 กิจกรรมนักเรียน',
              tablePerformance: [
                {
                  topic:
                    'ตัวบ่งชี้ที่ 2.1 มีแผนงาน/โครงการ ส่งเสริมกิจกรรมนักเรียน เพื่อให้ผู้เรียนอยู่อย่างพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 2.2 จัดกิจกรรมลูกเสือ/เนตรนารี/ยุวกาชาด หรือผู้ บำเพ็ญประโยชน์ สอดคล้องกับหลัก ปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 2.3 ส่งเสริมให้มีการจัดตั้ง ชุมนุม/ชมรม ตามหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 2.4 มีการประยุกต์ใช้ ภูมิปัญญาท้องถิ่น/วัฒนธรรม/หลักคำสอนทางศาสนา ในการจัด กิจกรรมนักเรียนตามหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 2.5 ติดตามผลการจัดกิจกรรมนักเรียน ตามหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 2.6 นำผลการติดตามมาปรับปรุง/พัฒนา กิจกรรมนักเรียน ตามหลักปรัชญาของเศรษฐกิจ พอเพียง',
                  selectOption: '',
                },
              ],

              totalDetail: '',
            },
            {
              tableHeading: 'องค์ประกอบ 3 กิจกรรมเพื่อสังคม และ สาธารณประโยชน์',
              tablePerformance: [
                {
                  topic:
                    'ตัวบ่งชี้ที่ 3.1 มีกิจกรรมเพื่อส่งเสริมสนับสนุนให้ผู้เรียนเกิดจิตอาสา และมีส่วนร่วมในกิจกรรม เพื่อสังคมและสาธารณประโยชน์ ตามหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 3.2 ผู้เรียนมีส่วนร่วมในการ แก้ปัญหา/พัฒนา สถานศึกษา/ชุมชน ด้านเศรษฐกิจ /สังคม/ สิ่งแวดล้อม/วัฒนธรรม ตามหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 3.3 ติดตามผลการดำเนินกิจกรรมเพื่อสังคมและ สาธารณประโยชน์ ของผู้เรียน ตามหลัก ปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 3.4 นำผลการติดตามมา ปรับปรุง /พัฒนา การดำเนินกิจกรรม เพื่อสังคมและสาธารณ ประโยชน์ของผู้เรียน ตามหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
              ],

              totalDetail: '',
            },
          ],

          totalDetail: '',
        },
        {
          tableMainHeading:
            ' ด้านที่ 4 ด้านการพัฒนาบุคลากรของสถานศึกษา (2 องค์ประกอบ 7 ตัวบ่งชี้) ',
          tableInside: [
            {
              tableHeading:
                'องค์ประกอบ 1 การพัฒนาบุคลากรตามหลักปรัชญาของเศรษฐกิจพอเพียง',
              tablePerformance: [
                {
                  topic:
                    'ตัวบ่งชี้ที่ 1.1 มีแผนงาน/โครงการ พัฒนาบุคลากรของสถานศึกษา เพื่อสร้างความรู้ความเข้าใจ และตระหนักในคุณค่าของหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 1.2 ประชุม/อบรม/สัมมนา/ศึกษาดูงานแหล่งเรียนรู้ต่างๆ เพื่อส่งเสริมการประยุกต์ใช้หลัก ปรัชญาของเศรษฐกิจพอเพียงในการดำเนินชีวิตและปฏิบัติภารกิจหน้าที่',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 1.3 ส่งเสริมให้บุคลากรแสวงหาความรู้เกี่ยวกับหลักปรัชญาของเศรษฐกิจพอเพียงอย่าง สม่ำเสมอ',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 1.4 จัดกิจกรรมส่งเสริมการดำเนินชีวิตและการปฏิบัติภารกิจหน้าที่ตามหลักปรัชญาของ เศรษฐกิจพอเพียง แก่บุคลากรของสถานศึกษา',
                  selectOption: '',
                },
              ],

              totalDetail: '',
            },
            {
              tableHeading: 'องค์ประกอบ 2 การติดตามและขยายผล',
              tablePerformance: [
                {
                  topic:
                    'ตัวบ่งชี้ที่ 2.1 ติดตามผลการดำเนินโครงการ/กิจกรรมพัฒนาบุคลากร เพื่อส่งเสริมการดำเนินชีวิต และปฏิบัติภารกิจหน้าที่ตามหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 2.2 นำผลการติดตามมา ปรับปรุง/พัฒนา การดำเนินโครงการ/กิจกรรมพัฒนาบุคลากร เพื่อส่งเสริมการดำเนินชีวิตและปฏิบัติภารกิจหน้าที่ตามหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 2.3 ขยายผลและเผยแพร่ ผลการดำเนินชีวิตและปฏิบัติภารกิจหน้าที่ของบุคลากรตาม หลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
              ],

              totalDetail: '',
            },
          ],

          totalDetail: '',
        },
        {
          tableMainHeading:
            ' ด้านที่ 5 ด้านผลลัพธ์/ภาพความสำเร็จ (4 องค์ประกอบ 12 ตัวบ่งชี้) ',
          tableInside: [
            {
              tableHeading: 'องค์ประกอบ 1 สถานศึกษา',
              tablePerformance: [
                {
                  topic: 'ตัวบ่งชี้ที่ 1.1 คุณลักษณะของสถานศึกษาพอเพียง',
                  selectOption: '',
                },
              ],

              totalDetail: '',
            },
            {
              tableHeading: 'องค์ประกอบ 2 ผู้บริหารสถานศึกษา',
              tablePerformance: [
                {
                  topic:
                    'ตัวบ่งชี้ที่ 2.1 คุณลักษณะของผู้บริหารสถานศึกษาพอเพียง',
                  selectOption: '',
                },
              ],

              totalDetail: '',
            },
            {
              tableHeading: 'องค์ประกอบ 3 บุคลากรของสถานศึกษา',
              tablePerformance: [
                {
                  topic:
                    'ตัวบ่งชี้ที่ 3.1 บุคลากรของสถานศึกษามีความรู้ความเข้าใจเกี่ยวกับหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 3.2 บุคลากรจัดการทรัพยากรและดำเนินชีวิตด้านเศรษฐกิจอย่างสอดคล้องกับหลักปรัชญาของเศรษฐกิจพอเพียง',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 3.3 บุคลากรอยู่ร่วมกับผู้อื่นในสังคมตามหลักปรัชญาของเศรษฐกิจพอเพียง และสามารถ เป็นแบบอย่างที่ดีในการปฏิบัติตนเพื่อส่วนรวมและสาธารณประโยชน์',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 3.4 บุคลากรรู้จักใช้และจัดการทรัพยากรธรรมชาติและสิ่งแวดล้อมได้อย่างสมดุล และ พร้อมรับต่อการเปลี่ยนแปลงต่างๆ',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 3.5 บุคลากรดำเนินชีวิตอย่างมีฐานรากทางวัฒนธรรม และพร้อมรับต่อการเปลี่ยนแปลง ทางวัฒนธรรม จากกระแสโลกาภิวัฒน์',
                  selectOption: '',
                },
              ],

              totalDetail: '',
            },
            {
              tableHeading: 'องค์ประกอบ 4 ผู้เรียน',
              tablePerformance: [
                {
                  topic:
                    'ตัวบ่งชี้ที่ 4.1 ผู้เรียนมีความรู้ความเข้าใจเกี่ยวกับ หลักปรัชญาของเศรษฐกิจพอเพียงตามมาตรฐานการเรียนรู้หลักเศรษฐกิจพอเพียงของแต่ละระดับชั้นปีการศึกษา',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 4.2 ผู้เรียนปฏิบัติตนให้ดำเนินชีวิตได้อย่างสมดุล และพร้อมรับต่อการเปลี่ยนแปลงในด้าน วัตถุ/เศรษฐกิจ',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 4.3 ผู้เรียนปฏิบัติตนให้ดำเนินชีวิตได้อย่างสมดุล และพร้อมรับต่อการเปลี่ยนแปลงในด้านสังคม',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 4.4 ผู้เรียนปฏิบัติตนให้ดำเนินชีวิตได้อย่างสมดุล และพร้อมรับต่อการเปลี่ยนแปลงในด้านสิ่งแวดล้อม',
                  selectOption: '',
                },
                {
                  topic:
                    'ตัวบ่งชี้ที่ 4.5 ผู้เรียนปฏิบัติตนให้ดำเนินชีวิตได้อย่างสมดุล และพร้อมรับต่อการเปลี่ยนแปลงในด้านวัฒนธรรม',
                  selectOption: '',
                },
              ],

              totalDetail: '',
            },
          ],

          totalDetail: '',
        },
      ],
    },
  ];

  headers = ['tableHeading', 'topic', 'operation'];

  formGroups = this.dataTable.map(
    (dataTable) =>
      new FormGroup({
        tableHeader: new FormControl(dataTable.tableHeader),
        tableBody: new FormArray(
          dataTable.tableBody.map(
            (tableBody) =>
              new FormGroup({
                tableMainHeading: new FormControl(tableBody.tableMainHeading),
                tableInside: new FormArray(
                  tableBody.tableInside.map(
                    (dataInside) =>
                      new FormGroup({
                        tableHeading: new FormControl(dataInside.tableHeading),
                        tablePerformance: new FormArray(
                          dataInside.tablePerformance.map(
                            (tablePerformance) =>
                              new FormGroup({
                                topic: new FormControl(tablePerformance.topic),
                                selectOption: new FormControl(null),
                              })
                          )
                        ),
                        totalScore: new FormControl(dataInside.score),
                        totalDetail: new FormControl(dataInside.totalDetail),
                      })
                  )
                ),
                totalScore: new FormControl(tableBody.totalScore),
                totalDetail: new FormControl(tableBody.totalDetail),
              })
          )
        ),
      })
  );

  formGroups2 = new FormGroup({
    budgetYear: new FormControl('', [
      CustomValidator.required({ text: 'ปีงบประมาณ' }),
    ]),
    prosFeedback: new FormControl(''),
    consFeedback: new FormControl(''),
  });

  userForm!: Partial<UserForm>;

  constructor(
    private formService: FormService,
    private rootStoreService: RootStoreService,
    private messageService: MessageService,
    private router: Router,
    private destroy$: TuiDestroyService
  ) {
    this.rootStoreService.formUser$.pipe(first()).subscribe((formUser) => {
      this.userForm = { ...formUser };
      formUser.feedback && this.formGroups2.patchValue(formUser.feedback);
    });
  }

  ngOnInit(): void {
    this.formService.getSubmitSubject
      .pipe(tap({ next: () => this.onSubmit() }), takeUntil(this.destroy$))
      .subscribe();
  }

  onSubmit() {
    const formStaff: FormStaff[] = [...this.dataTable];
    for (const i in this.formGroups) {
      this.formGroups[i].markAllAsTouched();

      if (this.formGroups[i].invalid) {
        this.messageService.clear();

        this.messageService.add({
          severity: 'error',
          summary: 'ผิดพลาด',
          detail: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        });
        return;
      }

      const formStaffGroup = this.formGroups[i].getRawValue() as FormStaff;

      formStaff[i] = { ...formStaffGroup };
    }

    this.formGroups2.markAllAsTouched();
    if (this.formGroups2.invalid) {
      this.messageService.clear();

      this.messageService.add({
        severity: 'error',
        summary: 'ผิดพลาด',
        detail: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      });
      return;
    }

    this.calculateScore(formStaff);

    this.userForm.formStaff = [...formStaff];

    this.userForm.feedback = this.formGroups2.getRawValue() as Feedback;

    this.rootStoreService.submitForm({ ...this.userForm });

    this.router.navigate(['/result']);
  }

  calculateScore(listFormStaff: FormStaff[]) {
    for (const formStaff of listFormStaff) {
      for (const tableBody of formStaff.tableBody) {
        for (const tableInside of tableBody.tableInside) {
          tableInside.totalScore = tableBody.tableInside.reduce((acc, _) => {
            return acc + 4;
          }, 0);

          tableInside.score = tableInside.tablePerformance
            .map((item) => {
              return this.operationType.indexOf(item.selectOption!) + 1;
            })
            .reduce((acc, curr) => {
              return acc + curr;
            }, 0);
        }

        tableBody.totalScore = tableBody.tableInside.reduce((acc, curr) => {
          return acc + curr.score!;
        }, 0);
      }
    }
  }
}
