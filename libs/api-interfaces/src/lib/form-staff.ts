export interface FormStaff {
  tableHeader: string;
  tableBody: {
    tableMainHeading: string;
    tableInside: {
      tableHeading: string;
      tablePerformance: {
        topic: string;
        selectOption?: string;
      }[];
      score?: number;
      totalScore?: number;
      totalDetail?: string;
    }[];
    totalScore?: number;
    totalDetail?: string;
  }[];
}
