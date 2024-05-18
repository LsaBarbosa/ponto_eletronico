import { Component } from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {EmployeeModule} from "../../../module/employee.module";
import {EmployeeService} from "../../service/employee.service";
import {Employee} from "../../model/Employee";

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css'],
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    EmployeeModule
  ],
})
export class NewEmployeeComponent {
  linkUrlColaborador: string = '/colaborador';
  username: string = '';

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  register() {

    const newEmployee: Employee = {
      id: null,
      name: this.username,
      workTime: []
    };


    this.employeeService.addEmployee(newEmployee)
      .subscribe(
        (response) => {
          console.log('Usuário criado com sucesso:', response);

          this.navigateTo(this.linkUrlColaborador);
        },
        (error) => {
          console.error('Erro ao criar usuário:', error);

        }
      );
  }
}
