import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {ActivatedRoute, Router} from "@angular/router";
import {RecordWorkTimeService} from "../../service/record-work-time.service";
import {EmployeeModule} from "../../../module/employee.module";
import {RecordWorkTimeModule} from "../../../module/record-work-time.module";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

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

  constructor(
    private router: Router,
    private recordWorkTimeService: RecordWorkTimeService,
    private route: ActivatedRoute
  ) {}

  navigateTo(url: string) {
    this.router.navigate([url], { queryParams: { username: this.username } });
  }

  registerCheckIn() {
    const name = this.username;
    this.recordWorkTimeService.addCheckin(name).subscribe({
      next: (response) => {
        console.log('Entrada registrada com sucesso', response);
        this.registerSuccess = true;
        this.registerFailure = false;
      },
      error: (error) => {
        console.error('Erro ao registrar entrada', error);
        this.registerSuccess = false;
        this.registerFailure = true;
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
      }
    });
  }


  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
  }
}
