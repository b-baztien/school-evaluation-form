export interface FormTeacher {
  tableHeader: string;
  tableBody: {
    tbodyHeading: string;
    header: {
      topic: string;
      inputData?: Array<string>;
      selectedOperation?: string;
    }[];
  }[];
  evidence: string[] | string;
  otherEvidence?: string;
  selectedEvidence?: string[];
  feedback?: string;
}
