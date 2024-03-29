import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormTeacher, UserForm } from '@school-evaluation-form/api-interfaces';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { RootStoreService } from 'apps/evaluation-form/src/services/root-store/root-store.service';
import { MessageService } from 'primeng/api';
import { EMPTY, first, switchMap, takeUntil, tap } from 'rxjs';
import { FormService } from '../../../services/form/form.service';
import { CustomValidator } from '../../../utils/validatates/form-validatate';

@Component({
  selector: 'school-evaluation-form-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form2Component {
  dataTable: FormTeacher[] = [
    {
      tableHeader: '1.ด้านการบริหารจัดการสถานศึกษา',
      tableBody: [
        {
          tbodyHeading: '1. ด้านนโยบาย',
          header: [
            {
              topic:
                '1.1 มีนโยบายน้อมนําหลักปรัชญาของเศรษฐกิจพอเพียงมาขับเคลื่อนในสถานศึกษา และบูรณาการในแผนปฏิบัติงานประจําปี',
              selectedOperation: '',
            },
            {
              topic:
                '1.2 ดําเนินการตามนโยบาย และแผนปฏิบัติงานประจําปีที่น้อมนําหลักปรัชญาของเศรษฐกิจพอเพียงมาขับเคลื่อนในสถานศึกษา',
              selectedOperation: '',
            },
            {
              topic:
                '1.3 มีแผนการนิเทศภายในการนำหลักปรัชญาของเศรษฐกิจพอเพียงสู่สถานศึกษา',
              selectedOperation: '',
            },
          ],
        },
        {
          tbodyHeading: '2.ด้านวิชาการ',
          header: [
            {
              topic:
                '2.1 มีแผนงาน/โครงการ/กิจกรรม ด้านวิชาการ ที่ส่งเสริมการบูรณาการหลักปรัชญาของเศรษฐกิจพอเพียงสู่การเรียนรู้',
              selectedOperation: '',
            },
            {
              topic:
                '2.2 ดําเนินการตาม แผนงาน/โครงการ/กิจกรรม ด้านวิชาการที่ส่งเสริมการบูรณาการหลักปรัชญาของเศรษฐกิจพอเพียงสู่การเรียนรู้',
              selectedOperation: '',
            },
          ],
        },
        {
          tbodyHeading: '3.ด้านงบประมาณ',
          header: [
            {
              topic:
                '3.1 มีการวางแผนการบริหารจัดการงบประมาณ ของสถานศึกษาที่สอดคล้องกับหลักปรัชญาของเศรษฐกิจพอเพียง',
              selectedOperation: '',
            },
            {
              topic:
                '3.2 ดําเนินการตามแผนงบประมาณของสถานศึกษาตามหลักปรัชญาของเศรษฐกิจพอเพียง',
              selectedOperation: '',
            },
          ],
        },
        {
          tbodyHeading: '4.บริหารงานทั่วไป',
          header: [
            {
              topic:
                '4.1 บริหารอาคารสถานที่และจัดการแหล่งการเรียนรู้ในสถานศึกษาตามหลักปรัชญาของเศรษฐกิจพอเพียง',
              selectedOperation: '',
            },
            {
              topic:
                '4.2 ประสานสัมพันธ์กับชุมชนให้มีส่วนร่วมในการจัดกิจกรรมการเรียนรู้เพื่อเสริมสร้างคุณลักษณะอยู่อย่างพอเพียงของผู้เรียน',
              selectedOperation: '',
            },
          ],
        },
      ],
      evidence: [
        'หลักสูตรสถานศึกษา / หลักสูตรสาระการเรียนรู้ท้องถิ่น',
        'แผนปฏิบัติการประจําปี',
        'คําสั่ง / ประกาศ',
        'บันทึกการประชุม / เอกสารการประชุม',
        'แผนการนิเทศภายใน / บันทึกผลการนิเทศ',
        'เอกสารการระดมทุน / ทรัพยากร',
        'แหล่งเรียนรู้ / หลักฐานเชิงประจักษ์',
        'สื่อ นวัตกรรมการเรียนรู้ / ทะเบียนสื่อนวัตกรรม',
        'เอกสารเผยแพร่และประชาสัมพันธ์',
        'สังเกตสภาพภูมิทัศน์ ฯลฯ',
        'อื่นๆ ระบุ',
      ],
      otherEvidence: '',
    },
    {
      tableHeader: '2.ด้านหลักสูตรและการจัดกิจกรรมการเรียนรู้',
      tableBody: [
        {
          tbodyHeading: '1.หน่วยการเรียนรู้หลักปรัชญาของเศรษฐกิจพอเพียง',
          header: [
            {
              topic:
                '1.1มีหน่วยการเรียนรู้หลักปรัชญาของเศรษฐกิจพอเพียง ตามมาตรฐานการเรียนรู้ การจัดทำหน่วยการเรียนรู้ (ครูต้องจัดทำหน่วยการเรียนรู้ให้ครบตามโครงสร้างรายวิชา อย่างน้อยคนละ 1 รายวิชา) จำนวนครูทั้งหมด {{input}} คน จำนวนครูที่จัดทำหน่วยการเรียนรู้ {{input}} คน คิดเป็นร้อยละ {{input}}',
              inputData: new Array(3),
              selectedOperation: '',
            },
            {
              topic:
                '1.2 มีการนิเทศ/ติดตามติดตาม การนําหน่วยการเรียนรู้หลักปรัชญาของเศรษฐกิจพอเพียงไป ใช้ในการจัดกิจกรรมการเรียนรู้',
              selectedOperation: '',
            },
            {
              topic:
                '1.3 มีการศึกษาวิเคราะห์/วิจัย เพื่อพัฒนาการจัดกิจกรรมการเรียนรู้หน่วยการเรียนรู้หลักปรัชญาของเศรษฐกิจพอเพียง',
              selectedOperation: '',
            },
          ],
        },
        {
          tbodyHeading:
            '2.การบูรณาการหลักปรัชญาของเศรษฐกิจพอเพียงสู่การเรียนรู้',
          header: [
            {
              topic:
                '2.1 มีแผนจัดการเรียนรู้บรณาการหลักปรัชญาของเศรษฐกิจพอเพียง ในกลุ่มสาระการเรียนรู้ต่างๆ ตามมาตรฐานการเรียนรู้ (ครูต้องจัดทำแผนการเรียนรู้ให้ครบตามจำนวนชั่วโมงที่กำหนดไว้ในโครงสร้างรายวิชา อย่างน้อยคนละ 1 รายวิชา) จำนวนครูทั้งหมด {{input}} คน จำนวนครูที่จัดทำแผนจัดการเรียนรู้ {{input}} คน คิดเป็นร้อยละ {{input}}',
              selectedOperation: '',
              inputData: new Array(3),
            },
            {
              topic:
                '2.2 จัดกิจกรรมการเรียนรู้ที่บูรณาการหลักปรัชญาของเศรษฐกิจพอเพียงในกลุ่มสาระการเรียนรู้ต่างๆ',
              selectedOperation: '',
            },
            {
              topic:
                '2.3 ผู้เรียนมีส่วนร่วมในการจัดกิจกรรมการเรียนรู้ที่บูรณาการหลักปรัชญาของเศรษฐกิจพอเพียง',
              selectedOperation: '',
            },
          ],
        },
        {
          tbodyHeading:
            '3.สื่อและแหล่งเรียนรู้เกี่ยวกับหลักปรัชญาของเศรษฐกิจพอเพียง',
          header: [
            {
              topic:
                '3.1 จัดหา/ผลิต/ใช้/เผยแพร่ สื่อการเรียนรู้ เพื่อบูรณาการหลักปรัชญาของเศรษฐกิจพอเพียง ในการจัดกิจกรรมการเรียนรู้ (ครูต้องจัดสื่อการเรียนรู้ อย่างน้อยคนละ 1 ชิ้น) จำนวนครูทั้งหมด {{input}} คน จำนวนครูที่มีสื่อการสอน/นวัตกรรม {{input}} คน คิดเป็นร้อยละ {{input}}',
              selectedOperation: '',
              inputData: new Array(3),
            },
            {
              topic:
                '3.2  จัดทํา/พัฒนา แหล่งเรียนรู้ในสถานศึกษาเพื่อสนับสนุนการเรียนรู้ เกี่ยวกับหลักปรัชญาของ เศรษฐกิจพอเพียง',
              selectedOperation: '',
            },
            {
              topic:
                '3.3 ใช้แหล่งเรียนรู้/ภูมิปัญญาท้องถิ่นในชุมชน ที่เสริมสร้างการพัฒนาคุณลักษณะ “อยู่อย่าง พอเพียง” ของผู้เรียน',
              selectedOperation: '',
            },
          ],
        },
        {
          tbodyHeading:
            '4.การวัดและประเมินผลการจัดกิจกรรมการเรียนรู้ตามหลักปรัชญาของเศรษฐกิจพอเพียง',
          header: [
            {
              topic:
                '4.1จัดทําเครื่องมือ และ วัดและประเมินผลที่หลากหลาย และสอดคล้องกับวัตถุประสงค์ของ หน่วย การเรียนรู้ที่บูรณาการหลักปรัชญาของเศรษฐกิจพอเพียง',
              selectedOperation: '',
            },
            {
              topic:
                '4.2ใช้วิธีการวัดผลและประเมินผลที่หลากหลาย และสอดคล้องกับการจัดกิจกรรมการเรียนรู้ที่ บูรณาการหลักปรัชญาของเศรษฐกิจพอเพียง',
              selectedOperation: '',
            },
          ],
        },
      ],
      evidence: '',
    },
    {
      tableHeader: '3. ด้านการจัดกิจกรรมพัฒนาผู้เรียน',
      tableBody: [
        {
          tbodyHeading: '1.การแนะแนวและระบบดูแลช่วยเหลือผู้เรียน',
          header: [
            {
              topic:
                '1.1 มีแผนงานแนะแนว เพื่อสนับสนุนการดําเนินชีวิตที่สอดคล้องกับหลักปรัชญาของเศรษฐกิจพอเพียง',
              selectedOperation: '',
            },
            {
              topic:
                '1.2 จัดกิจกรรมแนะแนวให้ผู้เรียนได้รู้จักการวางแผนชีวิตของตนเองได้อย่างสอดคล้องกับหลักปรัชญาของเศรษฐกิจพอเพียง',
              selectedOperation: '',
            },
            {
              topic:
                '1.3 มีระบบดูแลช่วยเหลือผู้เรียนให้สามารถ แก้ปัญหาและพัฒนาตนเองได้อย่างสอดคล้องกับหลักปรัชญาของเศรษฐกิจพอเพียง',
              selectedOperation: '',
            },
            {
              topic:
                '1.4 มีการนิเทศ ติดตาม การจัดกิจกรรมแนะแนว และระบบดูแลช่วยเหลือผู้เรียน ตามหลักปรัชญาของเศรษฐกิจพอเพียง',
              selectedOperation: '',
            },
          ],
        },
        {
          tbodyHeading: '2.กิจกรรมนักเรียน',
          header: [
            {
              topic:
                '2.1 มีแผนงาน/โครงการ ส่งเสริมกิจกรรมนักเรียน เพื่อให้ผู้เรียนมีคุณลักษณะ “อยู่อย่างพอเพียง”',
              selectedOperation: '',
            },
            {
              topic:
                '2.2 จัดกิจกรรมลูกเสือ/เนตรนารี/ยุวกาชาด หรือผู้บําเพ็ญประโยชน์ สอดคล้องกับหลักปรัชญาของเศรษฐกิจพอเพียง',
              selectedOperation: '',
            },
            {
              topic:
                '2.3  ส่งเสริมให้มีการจัดตั้ง ชุมนุม/ชมรม ตามหลักปรัชญาของเศรษฐกิจพอเพียง',
              selectedOperation: '',
            },
            {
              topic:
                '2.4  มีการประยุกต์ใช้ ภูมิปัญญาท้องถิ่น/วัฒนธรรม/หลักคําสอนทางศาสนาในการจัดกิจกรรมนักเรียนตามหลักปรัชญาของเศรษฐกิจพอเพียง',
              selectedOperation: '',
            },
          ],
        },
        {
          tbodyHeading: '3.กิจกรรมเพื่อสังคมและสาธารณะประโยชน์',
          header: [
            {
              topic:
                '3.1 มีกิจกรรมเพื่อส่งเสริมสนับสนุนให้ผู้เรียนเกิดจิตอาสา และมีส่วนร่วมในกิจกรรมเพื่อสังคม และสาธารณประโยชน์ตามหลักปรัชญาของเศรษฐกิจพอเพียง',
              selectedOperation: '',
            },
            {
              topic:
                '3.2 ผู้เรียนมีส่วนร่วมในการ แก้ปัญหา/พัฒนา สถานศึกษา/ชุมชน ด้านเศรษฐกิจ สังคม/สิ่งแวดล้อม/วัฒนธรรม ตามหลักปรัชญาของเศรษฐกิจพอเพียง',
              selectedOperation: '',
            },
          ],
        },
      ],
      evidence: [
        'แผนงาน/โครงการ แนะแนวและระบบดูแลช่วยเหลือผู้เรียน/โครงการที่ส่งเสริมกิจกรรมพัฒนาผู้เรียน',
        'แผนงาน/โครงการเพื่อส่งเสริมสนับสนุนให้ผู้เรียนเกิดจิตอาสา/จิตสาธารณะและการบริการสังคม',
        'การจัดกิจกรรมแนะแนว ให้ผู้เรียนได้รู้จักศักยภาพของตนเอง',
        'การจัดกิจกรรมลูกเสือ เนตรนารี ยุวกาชาด หรือผู้บําเพ็ญประโยชน์',
        'การจัดกิจกรรม เพื่อให้ผู้เรียนมีส่วนร่วม ในการแก้ปัญหาพัฒนา สถานศึกษา/ชุมชน ในด้านต่างๆ',
        'สถานศึกษา/ชุมชน มีการส่งเสริม ด้านภูมิปัญญาท้องถิ่น ศิลปวัฒนธรรม ประเพณี หรือวัฒนธรรม หรือหลักคําสอนทางศาสนาตามภูมิสังคม',
        'การจัดกิจกรรม เพื่อให้ผู้เรียนเกิดจิตอาสา จิตสาธารณะ และการบริการสังคม',
        'แฟ้มสะสมงาน/ การสรุปงาน/ โครงการที่เกี่ยวข้อง',
        'รูปภาพประกอบการทํากิจกรรมพัฒนาผู้เรียน ต่างๆ',
        'เกียรติบัตร/ รางวัลต่างๆ ที่เกี่ยวข้อง',
        'สอบถาม/ สัมภาษณ์ผู้บริหาร ครู นักเรียน ผู้แทนชุมชน',
      ],
      otherEvidence: '',
    },
    {
      tableHeader: '4. ด้านการพัฒนาบุคลากรของสถานศึกษา',
      tableBody: [
        {
          tbodyHeading: '1.การพัฒนาบุคลากรตามหลักปรัชญาของเศรษฐกิจพอเพียง',
          header: [
            {
              topic:
                '1.1 มีแผนงาน/โครงการ พัฒนาบุคลากรของสถานศึกษา เพื่อสร้างความรู้ความเข้าใจ และตระหนักใน คุณค่าของหลักปรัชญาของเศรษฐกิจพอเพียง',
              selectedOperation: '',
            },
            {
              topic:
                '1.2  ประชุม/อบรม/สัมมนา/ศึกษาดูงานแหล่งเรียนรู้ต่างๆ เพื่อส่งเสริมการประยุกต์ใช้หลักปรัชญาของเศรษฐกิจพอเพียงในการดําเนินชีวิตและปฏิบัติภารกิจหน้าที่ (ครูต้องได้รับการพัฒนาอย่างน้อย  1ครั้ง ต่อ1 ปีการศึกษา) จำนวนครูทั้งหมด {{input}} คน จำนวนครูที่รับการพัฒนา {{input}} คน คิดเป็นร้อยละ {{input}} โรงเรียนมีเครือข่ายการพัฒนาด้านหลักปรัชญาของเศรษฐกิจพอเพียงจำนวน {{input}} แห่ง',
              selectedOperation: '',
              inputData: new Array(3),
            },
            {
              topic:
                '1.3 ส่งเสริมให้บุคลากรแสวงหาความรู้เกี่ยวกับหลักปรัชญาของเศรษฐกิจพอเพียง อย่างสม่ำเสมอ',
              selectedOperation: '',
            },
            {
              topic:
                '1.4 จัดกิจกรรมส่งเสริมการดําเนินชีวิตและการปฏิบัติภารกิจหน้าที่ ตามหลักปรัชญาของเศรษฐกิจพอเพียง แก่บุคลากรกรของสถานศึกษา',
              selectedOperation: '',
            },
          ],
        },
      ],
      evidence: [
        'แผนพัฒนาครู/บุคลากร',
        'แผนปฏิบัติการประจําปี',
        'การจัดกิจกรรมแนะแนว ให้ผู้เรียนได้รู้จักศักยภาพของตนเอง',
        'แผนงานโครงการกิจกรรม',
        'หน่วยการเรียนรู้ แผนการจัดการเรียนรู้บูรณาการฯ',
        'บันทึกการประชุม แบบประเมินตนเองของครู',
        'แผนการนิเทศ ติดตามผลการดําเนินงานตามหลักปรัชญาของเศรษฐกิจพอเพียง',
        'ภาพถ่ายกิจกรรม : รางวัล เกียรติบัตร',
        'อื่นๆ ระบุ',
      ],
      otherEvidence: '',
    },
  ];

  formGroups = this.dataTable.map(
    (tableData) =>
      new FormGroup({
        tableBody: new FormArray(
          tableData.tableBody.map(
            (item) =>
              new FormArray(
                item.header.map(
                  () => new FormControl('', CustomValidator.required())
                )
              )
          )
        ),
        evidence: new FormControl([]),
        otherEvidence: new FormControl(),
        feedback: new FormControl(''),
      })
  );

  operationType = ['ดำเนินการแล้ว', 'อยู่ระหว่างดำเนินการ', 'ไม่ดำเนินการ'];

  headers = ['topic', 'operation'];

  userForm!: Partial<UserForm>;

  constructor(
    private formService: FormService,
    private rootStoreService: RootStoreService,
    private messageService: MessageService,
    private router: Router,
    private destroy$: TuiDestroyService
  ) {
    this.rootStoreService.formUser$
      .pipe(first(), takeUntil(this.destroy$))
      .subscribe((formUser) => {
        this.userForm = { ...formUser };
      });

    this.formService.getSubmitSubject
      .pipe(tap({ next: () => this.onSubmit() }), takeUntil(this.destroy$))
      .subscribe();
  }

  onSubmit() {
    const formTeacher = [...this.dataTable];
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

      const formTeacherGroup = this.formGroups[i].getRawValue();

      const tableBody = formTeacherGroup.tableBody as [][];

      formTeacher[i].evidence = formTeacherGroup.evidence;
      formTeacher[i].feedback = formTeacherGroup.feedback;

      for (const j in tableBody) {
        for (const k in tableBody[j]) {
          formTeacher[i].tableBody[j].header[k].selectedOperation =
            tableBody[j][k];
        }
      }
    }

    this.userForm.formTeacher = [...formTeacher];

    this.rootStoreService.submitForm({ ...this.userForm });

    this.router.navigate(['/result/pdf']);
  }

  isString(data: any) {
    return typeof data === 'string';
  }

  splitInput(data: string) {
    return data.split('{{input}}');
  }
}
