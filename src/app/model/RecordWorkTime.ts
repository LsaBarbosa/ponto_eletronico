import {Employee} from "./Employee";

export interface RecordWorkTime {
  id: number;
  startOfWork: string;
  endOfWork: string;
  startDate: string;
  endDate: string;
  timeWorked: string;
  overtime: string;
  employee: Employee;
}
