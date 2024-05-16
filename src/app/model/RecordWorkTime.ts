import {Employee} from "./Employee";

export interface RecordWorkTime {
  id: number;
  startOfWork: Date ;
  endOfWork: Date  ;
  timeWorkedInMinutes: string  ;
  employee: Employee  ;
  overtime:string;
}
