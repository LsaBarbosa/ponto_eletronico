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
    // Cria um novo objeto Employee com os dados do formulário
    const newEmployee: Employee = {
      id: null,
      name: this.username,
      workTime: [] // Preencha com os dados apropriados se necessário
    };

    // Chama o serviço para adicionar o novo usuário
    this.employeeService.addEmployee(newEmployee)
      .subscribe(
        (response) => {
          console.log('Usuário criado com sucesso:', response);
          // Redireciona para a página de colaborador após o registro bem-sucedido
          this.navigateTo(this.linkUrlColaborador);
        },
        (error) => {
          console.error('Erro ao criar usuário:', error);
          // Trate o erro apropriadamente (por exemplo, exibindo uma mensagem de erro para o usuário)
        }
      );
  }
}
