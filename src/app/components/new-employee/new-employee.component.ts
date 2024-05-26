import {Component, OnDestroy} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {EmployeeModule} from "../../../module/employee.module";
import {EmployeeService} from "../../service/employee.service";
import {Employee} from "../../model/Employee";
import {NgIf} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css'],
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    EmployeeModule,
    NgIf
  ],
})
export class NewEmployeeComponent implements OnDestroy{
  linkUrlColaborador: string = '/colaborador';
  username: string = '';
  createUserSuccess: boolean = false;
  createUserFailure: boolean = false;
  errorMessageTimeout: any;
  errorMessage: string = '';


  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}


  navigateTo(url: string) {
    this.router.navigate([url]);
  }
  register() {
    if (!this.username.trim()) {
      this.createUserSuccess = false;
      this.createUserFailure = true;
      this.errorMessage = 'Usuário não pode ser nulo';
      this.resetErrorMessage();
      return;
    }

    const newEmployee: Employee = {
      id: null,
      name: this.username,
      workTime: []
    };

    this.employeeService.addEmployee(newEmployee)
      .subscribe(
        (response) => {
          console.log('Usuário criado com sucesso:', response);
          this.createUserSuccess = true;
          this.createUserFailure = false;

        },
        (error: HttpErrorResponse) => {
          console.error('Erro ao criar usuário:', error);
          this.createUserSuccess = false;
          this.createUserFailure = true;
          this.errorMessage = this.getErrorMessage(error);
          this.resetErrorMessage();
        }
      );
  }

  getErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 403) {
      return 'Usuário com acesso não permitido';
    } else {
      return 'Falha ao criar usuário';
    }
  }

  resetErrorMessage() {
    if (this.errorMessageTimeout) {
      clearTimeout(this.errorMessageTimeout);
    }
    this.errorMessageTimeout = setTimeout(() => {
      this.createUserFailure = false;
      this.errorMessage = '';
    }, 5000);
  }


  ngOnDestroy() {
    if (this.errorMessageTimeout) {
      clearTimeout(this.errorMessageTimeout);
    }
  }

}
