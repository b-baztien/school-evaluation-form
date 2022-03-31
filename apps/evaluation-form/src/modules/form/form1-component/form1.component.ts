import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabaleData1 } from '../../../interfaces/table-data1.interface';

@Component({
  selector: 'school-evaluation-form-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form1Component {
  operationType = ['ควรปรับปรุง/แก้ไข', 'พอใช้', 'ดี', 'ดีมาก'];

  dataTable: TabaleData1[] = [
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

              TotalInsideDetail: '',
            },
          ],

          TotalDetail: '',
        },
      ],
    },
  ];

  headers = ['tableHeading', 'topic', 'operation'];
}
