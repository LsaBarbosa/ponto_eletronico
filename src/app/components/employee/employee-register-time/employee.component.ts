import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../../button/button-default/button.component";
import {ActivatedRoute, Router} from "@angular/router";
import {RecordWorkTimeService} from "../../../service/record-work-time.service";
import {EmployeeModule} from "../../../../module/employee.module";
import {RecordWorkTimeModule} from "../../../../module/record-work-time.module";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";
import {LogoutComponent} from "../../login/logout/logout.component";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    ButtonComponent,
    EmployeeModule,
    RecordWorkTimeModule,
    FormsModule,
    NgIf,
    LogoutComponent
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  linkUrlColaborador: string = '/opcao-colaborador';
  linkUrlRegistros: string = '/registros';
  username: string = '';
  registerSuccessCheckIn: boolean = false;
  registerSuccessCheckOut: boolean = false;
  registerFailure: boolean = false;
  errorMessageTimeout: any;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private recordWorkTimeService: RecordWorkTimeService,
  ) {}

  navigateTo(url: string) {
    this.router.navigate([url],
      {queryParams: {username: this.username}});
  }

  registerCheckIn() {
    const name = this.username;
    this.recordWorkTimeService.addCheckin(name).subscribe({
      next: (response) => {
        console.log('Entrada registrada com sucesso', response);
        this.registerSuccessCheckIn = true;
        this.registerSuccessCheckOut = false;
        this.registerFailure = false;
      },
      error: (error: HttpErrorResponse) => {
        this.registerSuccessCheckIn = false;
        this.registerFailure = true;
        this.errorMessage = this.getErrorMessage(error, 'entrada');
        this.resetErrorMessage();
      }
    });
  }

  registerCheckOut() {
    const name = this.username;
    this.recordWorkTimeService.addCheckout(name).subscribe({
      next: (response) => {
        console.log('Saída registrada com sucesso', response);
        this.registerSuccessCheckOut = true;
        this.registerSuccessCheckIn = false;
        this.registerFailure = false;
      },
      error: (error) => {
        console.error('Erro ao registrar saída', error);
        this.registerSuccessCheckOut = false;
        this.registerFailure = true;
        this.errorMessage = this.getErrorMessage(error, 'saída');
        this.resetErrorMessage();
      }
    });
  }

  getErrorMessage(error: HttpErrorResponse, action: string): string {
    if (error.status === 404) {
      return `Colaborador não cadastrado`;
    } else if (error.status === 400) {
      if (action === 'entrada') {
        return 'Registro de Saída não registrado';
      } else if (action === 'saída') {
        return 'Não há registro de entrada';
      }
    }
    return `Falha ao registrar ${action}`;
  }

  resetErrorMessage() {
    this.errorMessageTimeout = setTimeout(() => {
      this.registerFailure = false;
      this.errorMessage = '';
    }, 2000); // Tempo em milissegundos (2 segundos)
  }

  ngOnInit() {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    } else {
      this.router.navigate(['/']);
    }
  }
}
