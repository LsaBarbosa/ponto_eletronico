import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {ActivatedRoute, Router} from "@angular/router";
import {RecordWorkTimeService} from "../../service/record-work-time.service";
import {EmployeeModule} from "../../../module/employee.module";
import {RecordWorkTimeModule} from "../../../module/record-work-time.module";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    ButtonComponent,
    EmployeeModule,
    RecordWorkTimeModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  linkUrlCadastrar: string = '/cadastrar';
  linkUrlSair: string = '/';
  linkUrlRegistros: string = '/registros';
  username: string = '';
  registerSuccess: boolean = false;
  registerFailure: boolean = false;
  errorMessageTimeout: any;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private recordWorkTimeService: RecordWorkTimeService,
    private route: ActivatedRoute
  ) {
  }

  navigateTo(url: string) {
    this.router.navigate([url], {queryParams: {username: this.username}});
  }

  registerCheckIn() {
    const name = this.username;
    this.recordWorkTimeService.addCheckin(name).subscribe({
      next: (response) => {
        console.log('Entrada registrada com sucesso', response);
        this.registerSuccess = true;
        this.registerFailure = false;

      },
      error: (error: HttpErrorResponse) => {
        this.registerSuccess = false;
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
        this.registerSuccess = true;
        this.registerFailure = false;
      },
      error: (error) => {
        console.error('Erro ao registrar saída', error);
        this.registerSuccess = false;
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
        return 'Registro de Saída não registrado, encerre o registro de entrada aberto';

      } else if (action === 'saída') {
        return 'Não há registro de entrada para o colaborador, registre sua entrada';
      }
    }
    return `Falha ao registrar ${action}`;
  }

  resetErrorMessage() {
    this.errorMessageTimeout = setTimeout(() => {
      this.registerFailure = false;
      this.errorMessage = '';
    }, 5000); // Tempo em milissegundos (5 segundos)
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
  }
}
