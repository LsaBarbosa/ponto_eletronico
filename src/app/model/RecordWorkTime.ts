import {Employee} from "./Employee";

export interface RecordWorkTime {
  id: number;
  startOfWork: string; // Alterado para string para corresponder ao formato do backend
  endOfWork: string; // Alterado para string para corresponder ao formato do backend
  startDate: string; // Adicionado para corresponder ao formato do backend
  endDate: string; // Adicionado para corresponder ao formato do backend
  timeWorked: string; // Mantido, desde que corresponda ao formato do backend
  overtime: string; // Mantido, desde que corresponda ao formato do backend
  employee: Employee;
}
