export interface FormStaff {
  tableHeader: string;
  tableBody: TableBody[];
}

export interface TableBody {
  tableMainHeading: string | undefined;
  tableInside: TableInside[];
  totalScore?: number;
  totalDetail?: string;
}
export interface TableInside {
  tableHeading: string;
  tablePerformance: TablePerformance[];
  score?: number;
  totalScore?: number;
  totalDetail?: string;
}
export interface TablePerformance {
  topic: string;
  selectOption?: string;
}
