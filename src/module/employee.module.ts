import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {EmployeeService} from "../app/service/employee.service";


@NgModule({
  imports: [HttpClientModule],
  providers: [EmployeeService]
})
export class EmployeeModule { }
