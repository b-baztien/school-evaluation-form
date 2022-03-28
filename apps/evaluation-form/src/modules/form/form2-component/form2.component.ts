import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableData } from '../../../interfaces/table-data.interface';

@Component({
  selector: 'school-evaluation-form-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form2Component {
  operationType = ['ดำเนินการแล้ว', 'อยู่ระหว่างดำเนินการ', 'ไม่ดำเนินการ'];

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

  headers = ['topic', 'operation'];

  onValueChange(
    selectedOperation: string,
    header: { topic: string; selectedOperation?: string | undefined }
  ) {
    header.selectedOperation = selectedOperation;
  }
}
