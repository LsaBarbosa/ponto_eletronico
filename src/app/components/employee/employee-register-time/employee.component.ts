import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../../button/button-default/button.component";
import {Router} from "@angular/router";
import {RecordWorkTimeService} from "../../../service/record-work-time.service";
import {EmployeeModule} from "../../../../module/employee.module";
import {RecordWorkTimeModule} from "../../../../module/record-work-time.module";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";
import {LogoutComponent} from "../../login/logout/logout.component";
import {ErrorHandlerComponent} from "../../error-handler/error-handler.component";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    ButtonComponent,
    EmployeeModule,
    RecordWorkTimeModule,
    FormsModule,
    NgIf,
    LogoutComponent,
    ErrorHandlerComponent
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
  errorCheckin: HttpErrorResponse |null = null;
  errorCheckout: HttpErrorResponse |null = null;

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
        this.errorCheckin = null;
      },
      error: (error: HttpErrorResponse) => {
        this.registerSuccessCheckIn = false;
        this.registerSuccessCheckIn = false;
        this.errorCheckin = error;
      }
    });
  }

  registerCheckOut() {
    const name = this.username;
    this.recordWorkTimeService.addCheckout(name).subscribe({
      next: () => {
        this.registerSuccessCheckOut = true;
        this.registerSuccessCheckIn = false;
        this.errorCheckout = null;
      },
      error: (error) => {
        this.registerSuccessCheckOut = false;
        this.registerSuccessCheckOut = false;
        this.errorCheckout = error;
      }
    });
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
