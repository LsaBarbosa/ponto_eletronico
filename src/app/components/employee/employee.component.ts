import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {ActivatedRoute, Router} from "@angular/router";
import {RecordWorkTimeService} from "../../service/record-work-time.service";
import {EmployeeModule} from "../../../module/employee.module";
import {RecordWorkTimeModule} from "../../../module/record-work-time.module";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    ButtonComponent,
    EmployeeModule,
    RecordWorkTimeModule,
    FormsModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  linkUrlCadastrar: string = '/cadastrar';
  linkUrlSair: string = '/';
  linkUrlRegistros: string = '/registros';
  username: string = '';

  constructor(
    private router: Router,
    private recordWorkTimeService: RecordWorkTimeService,
    private route: ActivatedRoute
  ) {}

  navigateTo(url: string) {
    this.router.navigate([url], { queryParams: { username: this.username } });
  }

  registerCheckIn() {
    const name = this.username; // Usando o nome do usuário obtido do parâmetro da rota
    this.recordWorkTimeService.addCheckin(name).subscribe({
      next: (response) => {
        console.log('Entrada registrada com sucesso', response);
      },
      error: (error) => {
        console.error('Erro ao registrar entrada', error);
      }
    });
  }

  registerCheckOut() {
    const name = this.username; // Usando o nome do usuário obtido do parâmetro da rota
    this.recordWorkTimeService.addCheckout(name).subscribe({
      next: (response) => {
        console.log('Saída registrada com sucesso', response);
      },
      error: (error) => {
        console.error('Erro ao registrar saída', error);
      }
    });
  }

  ngOnInit() {
    // Pegar o nome de usuário dos parâmetros da rota
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
  }
}
