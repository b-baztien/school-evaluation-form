import { Component } from '@angular/core';
import { TableData } from '../../../interfaces/table-data.interface';

@Component({
  selector: 'school-evaluation-form-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss'],
})
export class Form2Component {
  operationType = ['ดำเนินการแล้ว', 'อยู่ระหว่างดำเนินการ', 'ไม่ดำเนินการ'];

  readonly data: TableData[] = [
    {
      subject: '1.ด้านนโยบาย',
      header: [
        {
          topic:
            '1.1 มีนโยบายน้อมนําหลักปรัชญาของเศรษฐกิจพอเพียงมาขับเคลื่อนในสถานศึกษา และบูรณาการในแผนปฏิบัติงานประจําปี',
          operation: [...this.operationType],
        },
        {
          topic:
            '1.2 ดําเนินการตามนโยบาย และแผนปฏิบัติงานประจําปีที่น้อมนําหลักปรัชญาของเศรษฐกิจพอเพียงมาขับเคลื่อนในสถานศึกษา',
          operation: [...this.operationType],
        },
        {
          topic:
            '1.3 มีแผนการนิเทศภายในการนำหลักปรัชญาของเศรษฐกิจพอเพียงสู่สถานศึกษา',
          operation: [...this.operationType],
        },
      ],
      evidence: [],
    },
  ];

  readonly headers = ['topic', 'operation', 'evidence'];
}
