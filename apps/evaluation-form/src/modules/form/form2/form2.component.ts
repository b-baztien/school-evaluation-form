import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { RootStoreService } from 'apps/evaluation-form/src/services/root-store/root-store.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { TableData } from '../../../interfaces/table-data.interface';
import { FormService } from '../../../services/form/form.service';
import {
  CustomValidator,
  FormValidator,
} from '../../../utils/validatates/form-validatate';

@Component({
  selector: 'school-evaluation-form-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form2Component implements OnDestroy {
  dataTable: TableData[] = [
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

  destroy$ = new Subject<void>();

  constructor(
    private formService: FormService,
    private rootStoreService: RootStoreService
  ) {
    this.formService.getSubmitSubject
      .pipe(tap({ next: () => this.onSubmit() }), takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    for (const i in this.formGroups) {
      this.formGroups[i].markAllAsTouched();

      // if (this.formGroups[i].invalid) return;

      const formUser = this.formGroups[i].getRawValue();

      const tableBody = formUser.tableBody as [][];

      for (const j in tableBody) {
        for (const k in tableBody[j]) {
          this.dataTable[i].tableBody[j].header[k].selectedOperation =
            formUser.tableBody[j][k];
        }
      }

      this.rootStoreService.nextStep();
    }
  }
}
