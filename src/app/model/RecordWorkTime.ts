import {Employee} from "./Employee";

export interface RecordWorkTime {
  id: number;
  startOfWork: Date ;
  endOfWork: Date  ;
  timeWorkedInMinutes: number  ;
  employee: Employee  ;
}
