import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ButtonComponent} from "../button/button.component";
import {Router} from "@angular/router";
import {EmployeeModule} from "../../../module/employee.module";
import {RecordWorkTimeModule} from "../../../module/record-work-time.module";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ButtonComponent,
    EmployeeModule,
    RecordWorkTimeModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  linkUrlColaborador: string = "/colaborador";

  username: string = '';
  password: string = '';
  loginSuccess: boolean = false;
  loginFailure: boolean = false;

  constructor(private router: Router) {}

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  login() {

    if (this.username !== '' && this.password !== '') {
      this.loginSuccess = true;
      this.loginFailure = false;
      this.router.navigate([this.linkUrlColaborador], { queryParams: { username: this.username } });
    } else {
      this.loginSuccess = false;
      this.loginFailure = true;
    }
  }
}
