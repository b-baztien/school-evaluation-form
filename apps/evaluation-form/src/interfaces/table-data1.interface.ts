export interface TabaleData1 {
  tableHeader: string;
  tableBody: {
    tableMainHeading: string;
    tableInside: {
      tableHeading: string;
      tablePerformance: {
        topic: string;
        selectOption?: string;
      }[];
      TotalInsideScore?: number;
      TotalInsideDetail?: string;
    }[];
    TotalScore?: number;
    TotalDetail?: string;
  }[];
}
