import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {EmployeeService} from "../app/service/employee.service";
import {RecordWorkTimeService} from "../app/service/record-work-time.service";


@NgModule({
  imports: [HttpClientModule],
  providers: [RecordWorkTimeService]
})
export class RecordWorkTimeModule { }
