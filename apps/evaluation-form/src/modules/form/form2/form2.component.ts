import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormTeacher, UserForm } from '@school-evaluation-form/api-interfaces';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { RootStoreService } from 'apps/evaluation-form/src/services/root-store/root-store.service';
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
        feedback: new FormControl(''),
      })
  );

  operationType = ['ดำเนินการแล้ว', 'อยู่ระหว่างดำเนินการ', 'ไม่ดำเนินการ'];

  headers = ['topic', 'operation'];

  userForm!: Partial<UserForm>;

  constructor(
    private formService: FormService,
    private rootStoreService: RootStoreService,
    private destroy$: TuiDestroyService
  ) {
    this.rootStoreService.formUser$
      .pipe(first(), takeUntil(this.destroy$))
      .subscribe((formUser) => {
        this.userForm = { ...formUser };
      });

    //TODO remove this
    for (const item of this.formGroups) {
      const form1 = item.controls['tableBody'] as any;
      for (const item2 of form1.controls as FormArray[]) {
        const form2 = item2.controls;
        for (const item3 of form2) {
          (item3 as FormControl).setValue(this.operationType[0]);
        }
      }
    }

    this.rootStoreService.stepper$.pipe(
      switchMap((stepper) => {
        if (stepper.stepIndex === 1) {
          return this.formService.getSubmitSubject.pipe(
            tap({ next: () => this.onSubmit() }),
            takeUntil(this.destroy$)
          );
        }
        return EMPTY;
      })
    );
  }

  onSubmit() {
    const formTeacher = [...this.dataTable];
    for (const i in this.formGroups) {
      this.formGroups[i].markAllAsTouched();

      if (this.formGroups[i].invalid) return;

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

    this.rootStoreService.nextStep();
  }
}
