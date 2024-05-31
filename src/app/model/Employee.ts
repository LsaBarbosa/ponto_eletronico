import {RecordWorkTime} from "./RecordWorkTime";

export class Employee {
  id: number|null = 0;
  name: string='';
  role:string='';
  workTime: RecordWorkTime[]=[];
}
